<template>
  <div class="text-caption cursor-pointer" @click.native="show = !show">
    {{$i18n(lifetime, 'name')}}
    <q-icon name="mdi-information">
      <q-tooltip>
        Haz click para mas detalles
      </q-tooltip>
    </q-icon>
    <q-menu v-model="show">
      <q-card>
        <q-card-section>
          {{$i18n(lifetime, 'name')}}
        </q-card-section>
        <q-card-section>
          {{$i18n(lifetime, 'description')}}
        </q-card-section>
        <q-card-section>
          {{lifetime.start.replace(/^(\d+)-(\d+)-(\d+)$/g, '$3/$2/$1')}}
          -
          {{lifetime.end.replace(/^(\d+)-(\d+)-(\d+)$/g, '$3/$2/$1')}}
        </q-card-section>
        <q-card-section>
          <q-checkbox readonly label="Incluye Feriados" :value="lifetime"></q-checkbox>
        </q-card-section>
        <q-card-section>
          {{lifetime.lifetime_weekdays.map(({ weekday }) => this.$i18n(weekday, 'name')).join(', ')}}
        </q-card-section>
      </q-card>
    </q-menu>
  </div>
</template>

<script>
import { date } from 'quasar'
const { formatDate } = date
export default {
  name: 'LifetimeDisplay',
  props: {
    lifetime: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    formatDate
  }
}
</script>

<style>
</style>
