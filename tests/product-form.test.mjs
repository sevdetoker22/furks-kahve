import assert from "node:assert/strict";
import test from "node:test";
import { isProductId, validateProduct } from "../lib/admin/product-form.ts";
import { selectFeaturedProducts } from "../lib/products/selection.ts";

function form(overrides = {}) {
  const values = { name: "Moda Blend", origin: "Brezilya", tasting_notes: "Fındık, karamel", roast_level: "Orta", price: "420,50", in_stock: "on", ...overrides };
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) if (value !== null) data.set(key, value);
  return data;
}

test("Turkish decimal prices are preserved exactly and unchecked stock is false", () => {
  const result = validateProduct(form({ in_stock: null }));
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.price, "420.50");
  assert.equal(result.data.in_stock, false);
});

test("invalid and ambiguous prices are rejected on the server", () => {
  for (const price of ["", "0", "-1", "1e3", "Infinity", "1.000,50", "4.205", "1000000.01", "9".repeat(400)]) {
    assert.ok(validateProduct(form({ price })).errors.price, `accepted ${price}`);
  }
  for (const price of ["0,01", "420", "420.50", "1000000"]) assert.equal(validateProduct(form({ price })).errors.price, undefined);
});

test("required text and roast options are validated without truncating saved input", () => {
  const result = validateProduct(form({ name: " ", origin: "A", roast_level: "Bilinmeyen", tasting_notes: "a".repeat(301) }));
  for (const key of ["name", "origin", "roast_level", "tasting_notes"]) assert.ok(result.errors[key]);
  assert.equal(result.values.tasting_notes.length, 301);
});

test("only positive int8 identifiers are accepted", () => {
  for (const id of ["", "0", "-1", "01", "1 OR 1=1", "9223372036854775808", "x"]) assert.equal(isProductId(id), false);
  for (const id of ["1", "9223372036854775807"]) assert.equal(isProductId(id), true);
});

test("homepage follows catalog order instead of preferring particular product IDs", () => {
  const products = [{ id: 7, name: "Yeni isim" }, { id: 3 }, { id: 2 }, { id: 1 }];
  assert.deepEqual(selectFeaturedProducts(products).map(({ id }) => id), [7, 3, 2]);
  assert.deepEqual(selectFeaturedProducts(products.filter(({ id }) => id !== 3)).map(({ id }) => id), [7, 2, 1]);
  assert.deepEqual(selectFeaturedProducts(products.slice(0, 2)).map(({ id }) => id), [7, 3]);
  assert.deepEqual(selectFeaturedProducts([]), []);
});
