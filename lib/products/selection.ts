// Stable IDs keep the current homepage selection when an owner renames a coffee.
// When a selected coffee is removed, the next available coffee fills its place.
export function selectFeaturedProducts<T extends { id: string | number }>(products: T[]) {
  const preferredIds = ["1", "2", "7"];
  const preferred = preferredIds.flatMap((id) => {
    const product = products.find((item) => String(item.id) === id);
    return product ? [product] : [];
  });
  return [...preferred, ...products.filter((product) => !preferredIds.includes(String(product.id)))].slice(0, 3);
}
