
const routes = [
  {
    path: '/',
    component: () => import('layouts/ClientLayout.vue'),
    children: [
      // { name: 'OAuthSuccessCallback', path: 'OAuthSuccessCallback', component: () => import('pages/OAuthCallback.vue') },
      // { name: 'OAuthFailureCallback', path: 'OAuthFailureCallback', component: () => import('pages/OAuthCallback.vue') },
      // props: true means listing id will be passed as a prop to the component
      { path: 'webstore', redirect: '/webstore/listings' },
      { path: 'webstore/listing/:ListingId', props: true, component: () => import('pages/Listing.vue') },
      { path: 'webstore/listings', component: () => import('pages/Listings.vue') },
      { path: 'webstore/cart', component: () => import('pages/Cart.vue'), meta: { requireAuthentication: true } },
      { path: 'webstore/checkout', component: () => import('pages/Checkout.vue'), meta: { requireAuthentication: true } },
      { path: 'webstore/purchase/:PurchaseId', props: true, component: () => import('pages/Purchase.vue'), meta: { requireAuthentication: true } },
      { path: 'webstore/purchases', component: () => import('pages/Purchases.vue'), meta: { requireAuthentication: true } },

      { path: '', redirect: '/website' },
      {
        path: 'website/:path(.*)?',
        props: { default: true, background: true },
        components: {
          default: () => import('pages/DynamicWebsite.vue'),
          background: () => import('components/BackgroundImage')
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
} else {
  routes.push({
    path: '/error404',
    component: () => import('pages/Error404.vue')
  })
  routes.push({
    path: '/error500',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
