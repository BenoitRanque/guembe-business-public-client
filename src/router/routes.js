
const routes = [
  {
    path: '/',
    component: () => import('layouts/ClientLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // { name: 'OAuthSuccessCallback', path: 'OAuthSuccessCallback', component: () => import('pages/OAuthCallback.vue') },
      // { name: 'OAuthFailureCallback', path: 'OAuthFailureCallback', component: () => import('pages/OAuthCallback.vue') },
      // props: true means listing id will be passed as a prop to the component
      { path: 'listing/:ListingId', props: true, component: () => import('pages/Listing.vue') },
      { path: 'listings', component: () => import('pages/Listings.vue') },
      { path: 'cart', component: () => import('pages/Cart.vue'), meta: { requireAuthentication: true } },
      { path: 'purchase/:PurchaseId', props: true, component: () => import('pages/Purchase.vue'), meta: { requireAuthentication: true } },
      { path: 'purchases', component: () => import('pages/Purchases.vue'), meta: { requireAuthentication: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
