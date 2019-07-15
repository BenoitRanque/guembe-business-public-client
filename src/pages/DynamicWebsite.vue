<template>
  <q-page>
    <dynamic-page v-if="page" :page="page">
      <dynamic-section v-for="(section, index) in page.sections" :key="`section_${index}`" :section="section">
        <dynamic-element
          v-for="(element, index) in section.elements"
          :key="`element_${index}`"
          :element="element"
          :card="!section.fullwidth"
        >
        </dynamic-element>
      </dynamic-section>
    </dynamic-page>
    <q-inner-loading :showing="!page">
      <q-spinner></q-spinner>
    </q-inner-loading>
  </q-page>
</template>

<script>
import DynamicPage from 'components/DynamicPage'
import DynamicSection from 'components/DynamicSection'
import DynamicElement from 'components/DynamicElement'
export default {
  name: 'DynamicWebsite',
  components: { DynamicPage, DynamicSection, DynamicElement },
  props: {
    path: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    $route (to, from) {
      this.$store.dispatch('website/LOAD_PAGE', { path: to.params.path })
    }
  },
  computed: {
    page () {
      return this.$store.state.website.page
    }
  },
  methods: {

  },
  preFetch ({ store, currentRoute, redirect }) {
    console.log('fetching')
    return store.dispatch('website/LOAD_PAGE', { path: currentRoute.params.path })
    // async function loadPage () {
    //   console.log('prefetching...')
    //   try {
    //     store.dispatch('website/LOAD_PAGE', { path: currentRoute.params.path })
    //   } catch (error) {
    //     console.log(error)
    //     redirect('/error404')
    //   }
    // }
    // return loadPage()
  }
  // async mounted () {
  //   try {
  //     await this.$store.dispatch('website/LOAD_PAGE', { path: this.path })
  //   } catch (error) {
  //     this.$gql.handleError(error)
  //   }
  // }
}
</script>
