
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { name: 'OAuthSuccessCallback', path: 'OAuthSuccessCallback', component: () => import('pages/Callback.vue') },
      { name: 'OAuthFailureCallback', path: 'OAuthFailureCallback', component: () => import('pages/Callback.vue') },
      { name: 'KhipuSuccessCallback', path: 'KhipuSuccessCallback', component: () => import('pages/Callback.vue') },
      { name: 'KhipuFailureCallback', path: 'KhipuFailureCallback', component: () => import('pages/Callback.vue') },

      // props: true means listing id will be passed as a prop to the component
      { path: 'listing/:ListingId', props: true, component: () => import('pages/Listing.vue') },
      { path: 'listings', component: () => import('pages/Listings.vue') },
      { path: 'purchase', component: () => import('pages/Purchase.vue') }
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
