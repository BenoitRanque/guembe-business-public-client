export async function handleCallback ({ dispatch }) {
  try {
    switch (this.$router.app.$route.name) {
      case 'OAuthSuccessCallback':
        await dispatch('oauth/handleOAuthSuccessCallback')
        break
      case 'OAuthFailureCallback':
        await dispatch('oauth/handleOAuthFailureCallback')
        break
      case 'KhipuSuccessCallback':
        await dispatch('khipu/handleKhipuSuccessCallback')
        break
      case 'KhipuFailureCallback':
        await dispatch('khipu/handleKhipuFailureCallback')
        break
    }
  } catch (error) {
    const GraphQLError = this.$router.app.$gql.GraphQLError
    if (error instanceof GraphQLError) {
      error.display()
    } else {
      throw error
    }
    this.$router.push('/')
  }
}
