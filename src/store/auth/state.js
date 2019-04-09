import auth0 from 'auth0-js'
import EventEmitter from 'events'
import authConfig from 'assets/auth_config.json'

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}/callback`,
  clientID: authConfig.clientId,
  responseType: 'id_token',
  scope: 'openid profile email'
})

class AuthService extends EventEmitter {
  // Starts the user login flow
  login (customState) {
    webAuth.authorize({
      appState: customState
    })
  }
}

export default {
  auth: new AuthService()
  //
}
