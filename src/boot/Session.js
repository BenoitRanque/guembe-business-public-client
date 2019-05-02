// import something here
import { SessionStorage } from 'quasar'
// Check if a session exists. If it does: remove, redirect to authentication

// leave the export, even if you don't use it
export default async ({ app, router, Vue, store }) => {
  // something to do
  if (SessionStorage.has('AuthProvider') && !store.getters['oauth/isAuthenticated']) {
    let provider = SessionStorage.getItem('AuthProvider')
    SessionStorage.remove('AuthProvider')
    store.dispatch('oauth/authenticate', { provider })
  }
}
