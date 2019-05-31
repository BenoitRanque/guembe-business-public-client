export function LOGIN ({ commit }, session) {
  commit('LOGIN', session)
}

export async function LOGOUT ({ commit }) {
  await this.$router.app.$api.post('/auth/logout')
  commit('LOGOUT')
}

export function authProtected ({ getters }, callback) {
  if (getters.isAuthenticated) {
    return callback()
  }
  this.$router.app.$root.$emit('AUTHENTICATION_REQUIRED')
}
