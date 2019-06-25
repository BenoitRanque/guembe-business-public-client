// "async" is optional
export default async ({ store, ssrContext }) => {
  await store.dispatch('RESTORE_SESSION', ssrContext)
}
