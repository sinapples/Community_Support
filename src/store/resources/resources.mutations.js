export default {
  /* Product input name */
  setMedia: (state, media) => {
    console.log(`>>setMedia${media}`)
    state.mediaData = media
  },

  setSelectedMedia: (state, selectedMedia) => {
    console.log(`>>setMedia${selectedMedia}`)
    state.selectedMedia = selectedMedia
  },

  /* Products */

  setProducts: (state, resources) => (state.mediaData = resources),

  addMedia: (state, resource) => state.mediaData.push(resource),

  removeProductById: (state, mediaId) => {
    const index = state.mediaData.findIndex(media => media.id === mediaId)
    state.mediaData.splice(index, 1)
  },

  /* Products deletion */
  addProductDeletionPending: (state, mediaId) =>
    state.mediaDeletionPending.push(mediaId),
  removeProductDeletionPending: (state, mediaId) => {
    const index = state.mediaData.findIndex(media => media.id === mediaId)
    state.mediaDeletionPending.splice(index, 1)
  },

  /* Product creation */
  setMediaCreationPending: (state, value) =>
    (state.mediaCreationPending = value)
}
