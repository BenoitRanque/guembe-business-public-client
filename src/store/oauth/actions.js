import { SessionStorage } from 'quasar'

const FACEBOOK_APP_ID = '623814848065170'
const GOOGLE_APP_ID = '92573611030-p7p0ul4o1e36pg92i2fuobs6cupb3n4u.apps.googleusercontent.com'

export function authenticate ({ commit }, { provider, route = null }) {
  // references
  // https://github.com/XanderLuciano/xauth2
  // https://github.com/dgrubelic/vue-authenticate
  // redirect to auth provider
  if (route === null) {
    route = this.$router && this.$router.app && this.$router.app.$route ? this.$router.app.$route.path : window.location.pathname
  }

  const state = {
    route,
    provider
    // current application state. Use to restore application when redirected here
  }

  let baseURL = null
  const queryObject = {
    state: JSON.stringify(state),
    redirect_uri: `${window.location.origin}/OAuthSuccessCallback`
  }

  switch (provider) {
    case 'facebook':
      baseURL = `https://www.facebook.com/v3.2/dialog/oauth`
      // if (this.$router.app.$q.platform.is.mobile) {
      // }
      queryObject.display = 'touch'
      queryObject.client_id = FACEBOOK_APP_ID
      queryObject.response_type = 'code'
      queryObject.scope = `email`
      break
    case 'google':
      baseURL = 'https://accounts.google.com/o/oauth2/v2/auth'
      queryObject.client_id = GOOGLE_APP_ID
      queryObject.response_type = 'code'
      queryObject.scope = `profile email`

      break
    // case 'github':
    //   client_id = GITHUB_APP_ID
    //   baseURL = `https://github.com/login/oauth/authorize`
    //   break
    default:
      throw new Error(`Unknow auth provider ${provider}`)
  }

  let queryArray = []
  for (const key in queryObject) {
    if (queryObject.hasOwnProperty(key)) {
      queryArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`)
    }
  }

  let queryString = queryArray.join('&')

  window.location.href = `${baseURL}?${queryString}`
}

export async function login ({ commit, dispatch }, { code, redirect_uri, provider }) {
  // verify auth on backend
  const query = /* GraphQL */`query ($provider: OAuthProviderEnum! $redirect_uri: String! $code: String!) {
    credentials: client_open_authentication (provider: $provider redirect_uri: $redirect_uri code: $code) {
      token
      account {
        client_id
        email
        name
      }
    }
  }`

  const variables = {
    code,
    redirect_uri,
    provider
  }

  try {
    const { credentials } = await this.$router.app.$gql(query, variables)

    commit('REGISTER_CREDENTIALS', credentials)

    SessionStorage.set('AuthProvider', provider)
  } catch (error) {
    this.$router.app.$gql.handleError(error)
  }

  dispatch('cart/loadCart', {}, { root: true })
}

export async function logout ({ commit }) {
  commit('DESTROY_CREDENTIALS')

  SessionStorage.remove('AuthProvider')
}

export async function handleOAuthSuccessCallback ({ dispatch }) {
  const code = this.$router.app.$route.query.code
  const state = JSON.parse(decodeURIComponent(this.$router.app.$route.query.state))
  const { provider, route } = state
  await dispatch('login', {
    provider,
    code,
    redirect_uri: `${window.location.origin}${this.$router.app.$route.path}`
  })
  this.$router.push(route)
}

export async function handleOAuthFailureCallback () {
  const state = JSON.parse(decodeURIComponent(this.$router.app.$route.query.state))
  const { route } = state
  this.$router.app.$q.notify({ color: 'negative', message: 'Error de inicio de session' })
  this.$router.push(route)
}

export function authProtected ({ getters }, callback) {
  if (getters.isAuthenticated) {
    return callback()
  }
  this.$router.app.$root.$emit('AUTHENTICATION_REQUIRED')
}
