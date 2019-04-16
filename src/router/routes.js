
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { name: 'OAuthSuccessCallback', path: 'OAuthSuccessCallback', component: () => import('pages/Callback.vue') },
      { name: 'OAuthFailureCallback', path: 'OAuthFailureCallback', component: () => import('pages/Callback.vue') },
      { name: 'KhipuSuccessCallback', path: 'KhipuSuccessCallback', component: () => import('pages/Callback.vue') },
      { name: 'KhipuFailureCallback', path: 'KhipuFailureCallback', component: () => import('pages/Callback.vue') }
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
