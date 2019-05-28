// import something here
import { Cookies } from 'quasar'
// "async" is optional
export default async ({ app, router, Vue, store, ssrContext }) => {
  // something to do
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

  const session = JSON.parse(atob(token))

  store.dispatch('LOGIN', session)
}
