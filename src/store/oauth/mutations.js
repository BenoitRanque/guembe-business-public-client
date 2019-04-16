export function REGISTER_CREDENTIALS (state, payload = {}) {
  if (!payload.token || !payload.account) {
    throw new Error(`Expected payload with properties: token, account. Got ${JSON.stringify(payload)}`)
  }
  const { token, account } = payload
  // document.cookie = `token=${token}`
  // TODO: store login indicator (not login information) in localstorage
  state.credentials = { token, account }
}

export function DESTROY_CREDENTIALS (state) {
  // document.cookie = `token=${null}`
  // TODO: destroy login indicator (not login information) in localstorage
  state.credentials = null
}
