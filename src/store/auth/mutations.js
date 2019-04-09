
export function REGISTER_CREDENTIALS (state, payload) {
  state.credentials = payload
}

export function DESTROY_CREDENTIAL (state) {
  state.credentials = null
}
