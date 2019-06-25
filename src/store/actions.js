import { Cookies } from 'quasar'
import { gql, api } from 'src/boot/api'

export async function LOGIN ({ commit, dispatch }, session) {
  commit('LOGIN', session)
  try {
    await dispatch('cart/loadCart')
  } catch (error) {
    gql.handleError(error)
  }
}

export async function LOGOUT ({ commit }) {
  await api.post('/auth/logout')
  commit('LOGOUT')
}

export function authProtected ({ getters }, callback) {
  if (getters.isAuthenticated) {
    return callback()
  }
  this.$router.app.$root.$emit('AUTHENTICATION_REQUIRED')
}

export async function RESTORE_SESSION ({ dispatch }, ssrContext) {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  const sessionCookie = cookies.get('session-auth')

  if (!sessionCookie) {
    return
  }

  const token = sessionCookie.split('.')[1]

  if (!token) {
    throw new Error('Unexpected format for session cookie')
  }

  // Buffer.from(token, 'base64').toString()

  // const session = JSON.parse(atob(token))
  const session = JSON.parse(Buffer.from(token, 'base64').toString())
  dispatch('LOGIN', session.ses)
}
