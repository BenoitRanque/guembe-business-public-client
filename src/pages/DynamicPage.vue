<template>
  <q-page>
    <dynamic-slider v-if="page.slides" :slides="page.slides"></dynamic-slider>
    <dynamic-section v-for="(section, index) in page.sections" :key="index" :section="section"></dynamic-section>
  </q-page>
</template>

<script>

import DynamicSection from 'components/DynamicSection'
import DynamicSlider from 'components/DynamicSlider'
export default {
  name: 'DynamicPage',
  components: { DynamicSection, DynamicSlider },
  data () {
    return {
      page: {
        slides: [
          {
            target: null,
            i18n: {
              image: {
                src: 'statics/img/grafico_fauna.jpg'
              }
            }
          },
          {
            target: null,
            i18n: {
              image: {
                src: 'statics/img/grafico_hotel.jpg'
              }
            }
          },
          {
            target: '/dynamic',
            i18n: {
              image: {
                src: 'statics/img/grafico_piscinas.jpg'
              }
            }
          },
          {
            target: '/dynamic',
            i18n: {
              image: {
                src: 'statics/img/grafico_recreacion.jpg'
              }
            }
          }
        ],
        sections: [
          {
            elements: [
              {
                target: null,
                title: null,
                subtitle: null,
                body: null,
                size_id: 'xl',
                image: {
                  src: 'statics/img/aviario_1.jpg'
                }
              }
            ]
          },
          // {
          //   section_type_id: 'slide',
          //   elements: [
          //     {
          //       target: null,
          //       title: null,
          //       subtitle: null,
          //       body: null,
          //       image: {
          //         src: 'statics/img/grafico_fauna.jpg'
          //       }
          //     },
          //     {
          //       target: null,
          //       title: null,
          //       subtitle: null,
          //       body: null,
          //       image: {
          //         src: 'statics/img/grafico_hotel.jpg'
          //       }
          //     },
          //     {
          //       target: null,
          //       title: null,
          //       subtitle: null,
          //       body: null,
          //       image: {
          //         src: 'statics/img/grafico_piscinas.jpg'
          //       }
          //     },
          //     {
          //       target: null,
          //       title: null,
          //       subtitle: null,
          //       body: null,
          //       image: {
          //         src: 'statics/img/grafico_recreacion.jpg'
          //       }
          //     }
          //   ]
          // },
          {
            section_type_id: 'smallcard',
            elements: [
              {
                target: '/dynamic',
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                caption: null,
                size: 'xl',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: '/dynamic',
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                caption: 'caption',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: null,
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                caption: 'caption',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: null,
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                caption: 'caption',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: null,
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                caption: 'caption',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: null,
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              }
            ]
          },
          {
            section_type_id: 'card',
            elements: [
              {
                target: '/dynamic',
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: '/dynamic',
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: null,
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: null,
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: null,
                title: 'title',
                subtitle: 'subtitle',
                body: 'body',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              },
              {
                target: null,
                title: 'title',
                subtitle: 'subtitle',
                body: '<div>Distribuida en los departamentos de Pando, Beni, La Paz, Cochabamba y Santa Cruz, habitando principalmente Bosques Amazónicos.</div><div>Sus amenazas están ligadas principalmente a la pérdida de los bosques <b>Amazónicos </b>causada por el avance de la frontera agrícola.</div><div>De igual manera la captura para el comercio de mascotas diezmó sus poblaciones durante los años 80 y en la actualidad esta actividad <i>ilícita </i>sigue afectando sus poblaciones.</div>',
                image: {
                  src: 'statics/img/amboro_card_1.jpg'
                }
              }
            ]
          }
        ]
      }
      // page: {
      //   name: 'name',
      //   i18n: {

      //   },
      //   background_image: {
      //     format_id: 'background'
      //   },
      //   elements: [
      //     {
      //       type: 'banner',
      //       image: {
      //         image_id,
      //         image_format: {
      //           image_format_id: 'banner'
      //         },
      //         placeholder: ''
      //       }
      //     },
      //     {
      //       type: 'banner',
      //       image: {
      //         image_id,
      //         image_format: {
      //           image_format_id: 'banner'
      //         },
      //         placeholder: ''
      //       }
      //     }
      //   ]
      // }
    }
  }
}
</script>

<style lang="stylus">

</style>
