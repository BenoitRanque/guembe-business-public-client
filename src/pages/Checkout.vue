<template>
  <q-page padding>
    <q-stepper
      flat
      vertical
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      >
      <q-step :name="0" title="Iniciar">
        Bienvenido al procedimiento de checkout. Aprete Siguiente para continuar
        <q-stepper-navigation align="right">
          <q-btn @click="step++" color="primary" label="Empezar" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="1" title="Compra">
        Por favor valide los detalles de su compra que se presentan aqui:
        <shopping-cart></shopping-cart>
        <q-stepper-navigation align="right" class="q-gutter-x-md">
          <q-btn flat color="primary" @click="step--" label="Volver"/>
          <q-btn @click="step++" color="primary" :disable="!$store.state.cart.listings.length" label="Siguiente" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="2" title="Facturacion">
        Datos de facturacion (opcional si no required factura con NIT)
        <q-select :loading="loading" :options="clients" v-model="client" label="NIT & Razon Social">
          <template v-slot:append>
            <create-client icon="mdi-account-plus" flat dense @done="clientCreated">
              <q-tooltip>Aggregar Cliente Nuevo</q-tooltip>
            </create-client>
          </template>
        </q-select>
        <q-stepper-navigation align="right" class="q-gutter-x-md">
          <q-btn flat color="primary" @click="step--" label="Volver"/>
          <q-btn @click="step++" color="primary" :label="client ? 'Siguiente' : 'Omitir'"/>
        </q-stepper-navigation>
      </q-step>
      <q-step :name="3" title="Finalizar">
        finish
        <q-stepper-navigation align="right" class="q-gutter-x-md">
          <q-btn flat color="primary" @click="step--" label="Volver"/>
          <q-btn @click="checkout" color="primary" label="Finalizar" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <!-- content -->
  </q-page>
</template>

<script>
import ShoppingCart from 'components/ShoppingCart'
import CreateClient from 'components/CreateClient'
export default {
  name: 'Checkout',
  components: { ShoppingCart, CreateClient },
  data () {
    return {
      step: 0,
      loading: false,
      client: null,
      clients: []
    }
  },
  methods: {
    mapClientOption (client) {
      const { client_id: value, business_name, tax_identification_number } = client
      return {
        ...client,
        value,
        label: [tax_identification_number, business_name].join(', ')
      }
    },
    clientCreated (client) {
      this.client = this.mapClientOption(client)
      this.loadClients()
    },
    async loadClients () {
      const query = /* GraphQL */`query {
        clients: account_client {
          client_id
          business_name
          tax_identification_number
        }
      }`

      try {
        this.loading = true

        const { clients } = await this.$gql(query)

        this.clients = clients.map(this.mapClientOption)
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async checkout () {
      try {
        this.loading = true

        const {
          data: {
            // sale_id,
            sale_payment: {
              payment: {
                khipu_app_url,
                khipu_payment_url
              }
            }
          }
        } = await this.$api.post('/store/checkout', { client_id: this.client ? this.client.client_id : null })

        window.location.href = this.$q.platform.is.mobile ? khipu_app_url : khipu_payment_url
      } catch (error) {
        this.$api.handleError(error)
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

<style>
</style>
