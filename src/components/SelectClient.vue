<template>
  <q-select :loading="loading" :options="clients" :value="value" @input="$event => $emit('input', $event)">
    <template v-slot:append>
      <create-client icon="mdi-account-plus" flat dense @done="clientCreated">
        <q-tooltip>Aggregar Cliente Nuevo</q-tooltip>
      </create-client>
    </template>
  </q-select>
</template>

<script>
import CreateClient from 'components/CreateClient'
export default {
  name: 'SelectClient',
  components: { CreateClient },
  props: {
    value: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      loading: false,
      showCreateClientDialog: false,
      newClient: {
        business_name: '',
        tax_identification_number: ''
      },
      client: null,
      clients: []
    }
  },
  watch: {
    clients (clients) {
      this.tab = this.clients.length ? 'select' : 'create'
    },
    value (value) {
      if (value) {
        this.tab = 'select'
      }
    }
  },
  methods: {
    async submit () {
      await this.createClient()
      await this.loadClients()
    },
    async createClient () {
      const query = /* GraphQL */`mutation ($objects: [account_client_insert_input!]!) {
        insert: insert_account_client (objects: $objects) {
          clients: returning {
            value: client_id
            label: business_name
          }
        }
      }`

      const variables = {
        objects: {
          business_name: this.newClient.business_name,
          tax_identification_number: this.newClient.tax_identification_number
        }
      }

      try {
        this.loading = true

        const { insert: { clients: [ client ] } } = await this.$gql(query, variables)

        this.$emit('input', client)
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async loadClients () {
      const query = /* GraphQL */`query {
        clients: account_client {
          value: client_id
          label: business_name
          client_id
          business_name
          tax_identification_number
        }
      }`

      try {
        this.loading = true

        const { clients } = await this.$gql(query)

        this.clients = clients
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadClients()
  }
}
</script>
