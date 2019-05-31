export function LOGIN (state, session) {
  state.session = session
}

export function LOGOUT (state) {
  state.session = null
}
