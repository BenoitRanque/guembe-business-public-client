export async function getOrCreateCurrentPurchase ({ dispatch }) {
  const currentPurchase = await dispatch('getCurrentPurchase')
  if (!currentPurchase) {
    return dispatch('createCurrentPurchase')
  }
  return currentPurchase
}

export async function getCurrentPurchase () {
  const query = /* GraphQL */`
    query {
      currentPurchases: store_purchase (where: { locked: { _eq: false } }) {
        purchase_id
      }
    }
  `
  const { currentPurchases: [ currentPurchase ] } = await this.$router.app.$gql(query)

  return currentPurchase
}

export async function createCurrentPurchase ({ commit }) {
  const query = /* GraphQL */`
    mutation {
      purchase: insert_store_purchase (objects: {}) {
        currentPurchase: returning {
          purchase_id
        }
      }
    }
  `

  const { purchase: { currentPurchase } } = await this.$router.app.$gql(query)

  return currentPurchase
}

export async function addToCurrentPurchase ({ dispatch }, { listingId, amount }) {
  const { purchase_id } = await dispatch('getOrCreateCurrentPurchase')

  const query = /* GraphQL */`
    mutation createListing ($objects: [store_purchase_listing_insert_input!]!) {
      insert_store_purchase_listing (objects: $objects on_conflict: {
        constraint: purchase_listing_pkey
        update_columns: [quantity]
      }) {
        affected_rows
      }
    }
  `

  const variables = {
    objects: {
      purchase_id,
      listing_id: listingId,
      quantity: amount
    }
  }

  const response = await this.$router.app.$gql(query, variables)

  return response
}

export async function getCurrentPurchaseId ({ state, dispatch, commit }) {
  if (state.purchase) {
    return state.purchase.purchase_id
  }

  const purchase = await dispatch('getOrCreateCurrentPurchase')

  commit('CURRENT_PURCHASE', purchase)

  return state.purchase.purchase_id
}
