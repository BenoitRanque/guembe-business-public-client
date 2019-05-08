export function UPDATE_CART (state, listings = []) {
  state.listings = listings
  state.lastUpdated = new Date()
}
