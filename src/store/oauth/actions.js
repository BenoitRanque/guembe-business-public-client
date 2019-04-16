const FACEBOOK_APP_ID = '623814848065170'
// const GITHUB_APP_ID = '730962c5bcb59188e9e9'
const GOOGLE_APP_ID = '92573611030-p7p0ul4o1e36pg92i2fuobs6cupb3n4u.apps.googleusercontent.com'

export function authenticate ({ commit }, { provider }) {
  // references
  // https://github.com/XanderLuciano/xauth2
  // https://github.com/dgrubelic/vue-authenticate
  // redirect to auth provider
  console.log(this)
  const state = {
    route: this.$router.app.$route.path,
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

export async function login ({ commit }, { code, redirect_uri, provider }) {
  // verify auth on backend
  const query = /* GraphQL */`query ($provider: OAuthProviderEnum! $redirect_uri: String! $code: String!) {
    client_authentication (provider: $provider redirect_uri: $redirect_uri code: $code) {
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

  const { client_authentication: credentials } = await this.$router.app.$gql(query, variables)
  commit('REGISTER_CREDENTIALS', credentials)
  // try {
  // } catch (error) {
  //   error.display()
  // }
}

export async function logout ({ commit }, payload) {
  commit('DESTROY_CREDENTIALS')
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
  this.$router.app.$q.notify('login failed')
  console.log(this.$router.app.$route)
  this.$router.push('/')
}
