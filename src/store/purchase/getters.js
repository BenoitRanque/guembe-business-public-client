export function getCurrentPurchase ({ state }) {
  return state.purchase ? state.purchase : null
}

export function getCurrentPurchaseId ({ getters }) {
  return !getters.getCurrentPurchase ? getters.getCurrentPurchase.purchase_id : null
}
