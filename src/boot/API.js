import axios from 'axios'
import { Notify } from 'quasar'

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
  constructor (api) {
    super('...args', 'return this.__call__(...args)')

    this.api = api

    return this.bind(this)
  }

  async __call__ (query = '', variables = {}) {
    const { data, errors } = await this.api.post('/graphql', { query, variables })

    if (errors) {
      throw new GraphQLError({ query, variables, errors })
    }

    return data
  }

  handleError (error) {
    if (error instanceof GraphQLError) {
      error.display()
    } else {
      throw error
    }
  }
}

export default ({ app, router, store, Vue }) => {
  const api = axios.create({
    baseURL: 'http://localhost:9090/api/v1',
    timeout: 1000,
    withCredentials: true
  })

  api.interceptors.request.use(async request => {
    // if there is no XSRF token, make a request to the dedicated endpoint
    if (!document.cookie['XSRF-TOKEN'] && !/\/csrftoken$/.test(request.url)) {
      // this request has an empty response (http 204)
      await api('/csrftoken')
    }
    return request
  })

  const gql = new GraphQL(api)

  Vue.prototype.$api = api
  Vue.prototype.$gql = gql
}
