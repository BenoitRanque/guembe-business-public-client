import axios from 'axios'
import { Notify, Cookies } from 'quasar'

const api = axios.create({
  baseURL: `/api/v1`,
  // baseURL: `https://${process.env.DEV ? 'chuturubi.com' : 'guembebioparque.com'}/api/v1`,
  timeout: 5000,
  // xsrfCookieName: 'XSRF-TOKEN', // default
  // xsrfHeaderName: 'X-XSRF-TOKEN', // default
  withCredentials: true
})

api.handleError = function handleError (error) {
  console.log(error.response)
  if (error.response && error.response.data) {
    Notify.create({
      message: error.response.data,
      color: 'negative',
      icon: 'mdi-alert-octagon'
    })
  } else {
    Notify.create({
      message: error.message,
      color: 'negative',
      icon: 'mdi-alert-octagon'
    })
  }
  throw error
}

class GraphQLError {
  constructor ({ query, variables, errors }) {
    this.query = query
    this.variables = variables
    this.errors = errors

    if (process.env.DEV) {
      console.error(this)
    }
  }

  display () {
    this.errors.forEach(({ message }) => {
      Notify.create({
        message,
        color: 'negative',
        icon: 'mdi-alert-octagon'
      })
    })
  }
}

class GraphQL extends Function {
  constructor () {
    super('...args', 'return this.__call__(...args)')

    return this.bind(this)
  }

  async __call__ (query = '', variables = {}) {
    const { data: { data, errors } } = await api.post('/graphql', { query, variables })

    if (errors) {
      throw new GraphQLError({ query, variables, errors })
    }

    return data
  }

  handleError (error) {
    console.log(error)
    if (error instanceof GraphQLError) {
      error.display()
    } else {
      api.handleError(error)
    }
  }
}

const gql = new GraphQL()

export default ({ app, router, store, Vue, ssrContext }) => {
  api.interceptors.request.use(async request => {
    console.log('making request...')
    const cookies = process.env.SERVER
      ? Cookies.parseSSR(ssrContext)
      : Cookies // otherwise we're on client

    const sessionCookie = cookies.get('session-auth')
    if (sessionCookie) {
      request.headers['Authorization'] = `session-auth ${sessionCookie}`
    }
    // // if there is no XSRF token, make a request to the dedicated endpoint
    // if (!xsrfCookie && !/\/csrftoken$/.test(request.url)) {
    //   // this request has an empty response (http 204)
    //   await api('/csrftoken')
    // }
    return request
  }, async error => Promise.reject(error))

  Vue.prototype.$api = api
  Vue.prototype.$gql = gql
}

export {
  api,
  gql
}
