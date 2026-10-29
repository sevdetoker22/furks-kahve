// Products arrive in catalog order. Keep homepage selection in one place so
// owner-managed featuring can replace this rule without changing the cards.
export function selectFeaturedProducts<T>(products: readonly T[]): T[] {
  return products.slice(0, 3);
}
