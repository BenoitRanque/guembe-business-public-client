
export async function loadCart ({ commit }) {
  const query = /* GraphQL */`
    query {
      cart: store_cart_listing {
        listing_id
        quantity
        listing {
          available_listing {
            listing_id
          },
          listing_stock {
            remaining_stock
          }
          listing_id
          public_name
          description
          listing_products {
            product {
              public_name
              description
            }
            quantity
            price
            lifetime {
              public_name
              description
              start
              end
              lifetime_weekdays (order_by: [{weekday: { weekday_id: asc } }]) {
                weekday {
                  weekday_id
                  weekday_name
                }
              }
            }
          }
        }
      }
    }
  `
  const variables = {}

  const { cart } = await this.$router.app.$gql(query, variables)

  commit('UPDATE_CART', cart)

  return cart
}

export async function addToCart ({ dispatch }, objects) {
  const query = /* GraphQL */`
    mutation createListing ($objects: [store_cart_listing_insert_input!]!) {
      insert_store_cart_listing (objects: $objects on_conflict: {
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

  await this.$router.app.$gql(query, variables)

  const cart = await dispatch('loadCart')

  return cart
}

export async function removeFromCart ({ dispatch }, { listingId }) {
  const query = /* GraphQL */`
    mutation ($where: store_cart_listing_bool_exp!) {
      delete_store_cart_listing (where: $where) {
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

  await this.$router.app.$gql(query, variables)

  const cart = await dispatch('loadCart')

  return cart
}
