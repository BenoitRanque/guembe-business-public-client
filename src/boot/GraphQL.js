// import something here
// import axios from 'axios'
import { Notify } from 'quasar'

class GraphQLError {
  constructor ({ request, response, data, errors }) {
    this.request = request
    this.response = response
    this.data = data
    this.errors = errors

    if (process.env.DEV) {
      console.error(this)
    }
  }

  display () {
    if (this.errors) {
      this.errors.forEach(({ message }) => {
        Notify.create({
          message,
          color: 'negative',
          icon: 'mdi-alert'
        })
      })
    } else {
      Notify.create({
        message: `${this.response.statusCode}: ${this.response.statusText}`,
        color: 'negative',
        icon: 'mdi-alert'
      })
    }
  }
}

export default ({ app, router, store, Vue }) => {
  const GraphQL = async function GraphQL (query = ``, variables = {}, options = {}) {
    const defaultOptions = {
      useCredentials: true,
      role: null
    }

    options = {
      ...defaultOptions,
      ...options
    }

    const headers = {
      'Content-Type': 'application/json'
    }

    if (options.useCredentials && store.getters.isAuthenticated) {
      headers['Authorization'] = `Bearer ${store.state.credentials.token}`
      if (options.role) {
        headers['x-hasura-role'] = options.role
      }
    }

    const request = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables
      })
    }

    const response = await fetch(store.state.GQL_API_ENDPOINT, request)

    const { data, errors } = await response.json()

    // if (!response.ok) {
    if (!response.ok || errors) {
      throw new GraphQLError({ request, response, data, errors })
    }

    return data
  }

  Vue.prototype.$gql = GraphQL
}
