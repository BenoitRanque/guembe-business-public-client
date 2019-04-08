<template>
  <div>
    <template v-if="isAuthenticated">
      <q-btn flat dense no-caps @click="$router.push('/user')">
        {{accountUsername}}
      </q-btn>
      <q-btn icon="mdi-logout" flat dense @click="logout">
        <q-tooltip>
          Cerrar Session
        </q-tooltip>
      </q-btn>
    </template>
    <template v-else>
      <q-btn icon="mdi-login" flat dense @click="showDialog = true">
        <q-tooltip>
          Iniciar Session
        </q-tooltip>
      </q-btn>
    </template>

    <q-dialog v-model="showDialog" @hide="reset">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Bienvenido
          </div>
          Por favor introdusca sus credenciales
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus dense v-model="username" placeholder="Usuario"></q-input>
        </q-card-section>

        <q-card-section>
          <q-input outlined dense v-model="password" type="password" placeholder="Contraseña"></q-input>
        </q-card-section>

        <!-- <q-separator></q-separator> -->

        <q-card-actions align="center">
          <q-btn label="Iniciar Session" flat @click="login"></q-btn>
        </q-card-actions>

        <q-inner-loading :showing="loading">
          <q-spinner></q-spinner>
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
export default {
  name: 'AuthCredentials',
  data () {
    return {
      showDialog: false,
      loading: false,
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapState({
      accountUsername: state => state.credentials && state.credentials.account ? state.credentials.account.username : null
    })
  },
  methods: {
    ...mapMutations(['REGISTER_CREDENTIALS', 'DESTROY_CREDENTIALS']),
    authenticationRequested () {
      this.showDialog = true
    },
    async login () {


      // const query = /* GraphQL */`query ($username: String! $password: String!) {
      //   credentials: auth_credentials (username: $username password: $password) {
      //     account {
      //       username
      //       account_id
      //       roles
      //     }
      //     token
      //   }
      // }`
      // const variables = {
      //   username: this.username,
      //   password: this.password
      // }

      // try {
      //   this.loading = true
      //   const { credentials } = await this.$gql(query, variables, { useCredentials: false })
      //   this.REGISTER_CREDENTIALS(credentials)
      //   this.$q.notify({
      //     message: 'Session Iniciada',
      //     color: 'positive',
      //     icon: 'mdi-check'
      //   })
      //   this.showDialog = false
      // } catch (error) {
      //   this.password = ''
      //   error.display()
      // } finally {
      //   this.loading = false
      // }
    },
    logout () {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Cerrar Session?',
        ok: true,
        cancel: true
      }).onOk(() => {
        this.DESTROY_CREDENTIALS()
        this.$q.notify({
          message: 'Session Cerrada',
          color: 'positive',
          icon: 'mdi-check'
        })
        this.$router.push('/')
      })
    },
    reset () {
      this.username = ''
      this.password = ''
    }
  },
  created () {
    this.$root.$on('AUTHENTICATION_REQUIRED', this.authenticationRequested)
  },
  beforeDestroy () {
    this.$root.$off('AUTHENTICATION_REQUIRED', this.authenticationRequested)
  }
}
</script>

<style>
</style>
