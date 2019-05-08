// import something here

// leave the export, even if you don't use it
export default async ({ app, router, Vue, store }) => {
  // something to do
  store.dispatch('cart/loadCart')
}
