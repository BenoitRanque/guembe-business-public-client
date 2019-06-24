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
          {{lifetime.start}}
          -
          {{lifetime.end}}
        </q-card-section>
        <q-card-section>
          {{lifetime.lifetime_weekdays.map(({ weekday }) => this.$i18n(weekday, 'name')).join(', ')}}
        </q-card-section>
      </q-card>
    </q-menu>
  </div>
</template>

<script>
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
  }
}
</script>

<style>
</style>
