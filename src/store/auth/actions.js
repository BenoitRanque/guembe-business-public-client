const FACEBOOK_APP_ID = '623814848065170'
const GITHUB_APP_ID = '730962c5bcb59188e9e9'

export function authenticate ({ commit }, { provider }) {
  // references
  // https://github.com/XanderLuciano/xauth2
  // https://github.com/dgrubelic/vue-authenticate
  // redirect to auth provider
  const state = {
    route: '/',
    provider
    // current application state. Use to restore application when redirected here
  }

  let baseURL = ''
  let client_id = ''

  switch (provider) {
    case 'facebook':
      client_id = FACEBOOK_APP_ID
      baseURL = `https://www.facebook.com/v3.2/dialog/oauth`
      break
    case 'github':
      client_id = GITHUB_APP_ID
      baseURL = `https://github.com/login/oauth/authorize`
      break
    case 'google':
      break
    default:
      throw new Error(`Unknow auth provider ${provider}`)
  }

  const query = [
    `client_id=${client_id}`,
    `redirect_uri=${window.location.origin}/callback`,
    `state=${JSON.stringify(state)}`
  ].join('&')

  // console.log(`${baseURL}?${query}`)
  window.location.href = `${baseURL}?${query}`
}

export async function login ({ commit }, { code, redirect_uri, provider }) {
  // verify auth on backend
  const query = /* GraphQL */`query ($provider: OAuthProviderEnum! $redirect_uri: String! $code: String!) {
    client_authentication (provider: $provider redirect_uri: $redirect_uri code: $code) {
      token
      account {
        account_id
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

  console.log('is router app root app?', this.$router.app === this.$router.app.$root)

  try {
    const response = await this.$router.app.$gql(query, variables)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

export async function logout (ctx, payload) {

}
