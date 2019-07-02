import { gql } from 'src/boot/api'
export async function loadCart ({ commit }) {
  const query = /* GraphQL */`
    query {
      cart: webstore_cart_listing {
        listing_id
        quantity
        listing {
          listing_id
          i18n (where: { locale_id: { _eq: "es" } }) {
            name
            description
          }
          inventory {
            remaining
            available
          }
          total
          listing_products {
            product {
              i18n(where: { locale_id: { _eq: "es" } }) {
                name
                description
              }
            }
            quantity
            price
          }
          lifetime {
            i18n(where: { locale_id: { _eq: "es" } }) {
              name
              description
            }
            start
            end
            lifetime_weekdays (order_by: [{weekday: { weekday_id: asc } }]) {
              weekday {
                i18n(where: { locale_id: { _eq: "es" } }) {
                  name
                }
              }
            }
          }
        }
      }
    }
  `
  const variables = {}

  const { cart } = await gql(query, variables)

  commit('UPDATE_CART', cart)

  return cart
}

export async function addToCart ({ dispatch }, objects) {
  const query = /* GraphQL */`
    mutation createListing ($objects: [webstore_cart_listing_insert_input!]!) {
      insert_webstore_cart_listing (objects: $objects on_conflict: {
        constraint: cart_listing_pkey
        update_columns: [quantity]
      }) {
        affected_rows
      }
    }
  `

  const variables = {
    objects
  }

  await gql(query, variables)

  const cart = await dispatch('loadCart')

  return cart
}

export async function removeFromCart ({ dispatch }, { listingId }) {
  const query = /* GraphQL */`
    mutation ($where: webstore_cart_listing_bool_exp!) {
      delete_webstore_cart_listing (where: $where) {
        affected_rows
      }
    }
  `

  const variables = {
    where: {
      listing_id: {
        _eq: listingId
      }
    }
  }

  await gql(query, variables)

  const cart = await dispatch('loadCart')

  return cart
}
