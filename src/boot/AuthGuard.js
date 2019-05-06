// import something here
import { SessionStorage } from 'quasar'
// leave the export, even if you don't use it
export default async ({ app, router, Vue, store }) => {
  // something to do
  if (SessionStorage.has('AuthProvider') && !store.getters['oauth/isAuthenticated']) {
    let provider = SessionStorage.getItem('AuthProvider')
    SessionStorage.remove('AuthProvider')
    store.dispatch('oauth/authenticate', { provider, route: window.location.pathname })
  }

  router.beforeEach((to, from, next) => {
    if (to.meta.requireAuthentication && !store.getters['oauth/isAuthenticated']) {
      next('/')
    } else {
      next()
    }
  })
}
