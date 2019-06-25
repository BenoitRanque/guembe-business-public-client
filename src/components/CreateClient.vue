<template>
  <q-btn v-bind="$attrs" @click.stop="showDialog = true">
    <slot />
    <q-dialog v-model="showDialog" :persistent="loading">
      <q-card>
        <q-bar>
          Crear Cliente
          <q-space></q-space>
          <q-btn flat dense icon="mdi-close" v-close-popup :disable="loading"></q-btn>
        </q-bar>
        <q-form @submit="submit" class="q-gutter-y-md q-pa-md">
          <q-input type="number" placeholder="0" required label="NIT" square outlined v-model="client.tax_identification_number"></q-input>
          <q-input placeholder="SIN NOMBRE" required label="RAZON SOCIAL" square outlined v-model="client.business_name"></q-input>

          <q-btn type="submit" color="accent">Crear</q-btn>

          <q-inner-loading :showing="loading">
            <q-spinner></q-spinner>
          </q-inner-loading>
        </q-form>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script>
export default {
  name: 'CreateClient',
  data () {
    return {
      loading: false,
      showDialog: false,
      client: {
        business_name: '',
        tax_identification_number: ''
      }
    }
  },
  methods: {
    reset () {
      this.client.business_name = ''
      this.client.tax_identification_number = ''
    },
    async submit () {
      const query = /* GraphQL */`mutation ($objects: [account_client_insert_input!]!) {
        insert: insert_account_client (objects: $objects) {
          clients: returning {
            client_id
            business_name
            tax_identification_number
          }
        }
      }`

      const variables = {
        objects: {
          business_name: this.client.business_name,
          tax_identification_number: this.client.tax_identification_number
        }
      }

      try {
        this.loading = true

        const { insert: { clients: [ client ] } } = await this.$gql(query, variables)

        this.showDialog = false
        this.reset()
        this.$emit('done', client)
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
