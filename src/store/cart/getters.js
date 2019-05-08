export function listingCount (state) {
  return state.listings.length
}

export function listingIsInCart (state) {
  return listingId => state.listings.some(listing => listing.listing_id === listingId)
}

export function listingInCart (state, getters) {
  return listingId => {
    if (getters.listingIsInCart(listingId)) {
      return state.listings.find(listing => listing.listing_id === listingId)
    }
    return null
  }
}
