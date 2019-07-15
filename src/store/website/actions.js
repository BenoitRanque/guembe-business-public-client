import { gql } from 'src/boot/api'

export async function LOAD_PAGE ({ commit, state }, { path = '' } = { path: null }) {
  const query = /* GraphQL */`query ($where: website_page_bool_exp $locale_id: String!) {
    pages: website_page (where: $where) {
      page_id
      image_id
      image {
        ...Image
      }
      name
      path
      sections (order_by: { index: asc }) {
        section_id
        index
        fullwidth
        elements (order_by: { index: asc }) {
          element_id
          index
          size_id
          external_link
          internal_link
          listing_link
          i18n (where: { locale_id: { _eq: $locale_id } }) {
            locale_id
            image_id
            image {
              name
              ...Image
            }
            body
            caption
            subtitle
            title
          }
        }
      }
    }
  }

  fragment Image on website_image {
    image_id
    placeholder
    format {
      format_sizes {
        size_id
        width
      }
    }
  }`

  const variables = {
    locale_id: state.locale,
    where: {
      path: {
        _eq: path === null && state.page ? state.page.path : path
      }
    }
  }

  const { pages: [ page ] } = await gql(query, variables, { role: 'administrador' })

  if (!page) {
    commit('PAGE', null)
    // throw new Error(`Page at /${path} not found`)
  }

  commit('PAGE', page)

  return page
}
