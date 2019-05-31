// define helper functions for setting image src and srcset

const baseUrl = `https://chuturubi.com/api/v1`
const sizes = [
  { name: 'xl', width: 1200 },
  { name: 'lg', width: 800 },
  { name: 'md', width: 600 },
  { name: 'sm', width: 400 },
  { name: 'xs', width: 300 }
]

const listing = {
  src (imageId, size = 'xl') {
    return `${baseUrl}/image/listing/${imageId}?size=${size}`
  },
  srcset (imageId) {
    return sizes.map(({ name, width }) => `${this.src(imageId, name)} ${width}w`).join(', ')
  },
  upload (listingId) {
    return `${baseUrl}/image/listing/upload/${listingId}`
  }
}

export default async ({ app, router, Vue, store }) => {
  // something to do
  Vue.prototype.$imgUrl = {
    listing
  }
}
