import ResourcesAsianMedia from '@/firebase/resources-asian-media'

export default {
  /**
   * Fetch medias of current loggedin user
   */
  getMedia: async ({ commit }) => {
    const db = new ResourcesAsianMedia()

    const media = await db.readAll()

    commit('setMedia', media)
  },

  /**
   * Create a media for current loggedin user
   */
  createMedia: async ({ commit }, media) => {
    const userProductDb = new ResourcesAsianMedia()

    commit('setMediaCreationPending', true)
    const createdProduct = await userProductDb.create(media)
    commit('addMedia', createdProduct)
    commit('setMediaCreationPending', false)
  },

  /**
   * Create a media for current loggedin user
   */
  updateMedia: async ({ dispatch, commit }, media) => {
    const userProductDb = new ResourcesAsianMedia()

    commit('setMediaCreationPending', true)
    await userProductDb.update(media)
    commit('setMediaCreationPending', false)
    dispatch('getMedia')
    // const media = await userProductDb.readAll()

    // commit('setMedia', media)
  },

  /**
   * Create a new media for current loggedin user and reset media name input
   */
  triggerAddMediaAction: ({ dispatch, state, commit }) => {
    if (state.mediaNameToCreate === '') return

    const media = { name: state.mediaNameToCreate }
    commit('setProductNameToCreate', '')
    dispatch('createUserProduct', media)
  },

  /**
   * Delete a user media from its id
   */
  deleteMedia: async ({ dispatch, commit, getters }, mediaId) => {
    if (getters.isMediaDeletionPending(mediaId)) return

    const userProductsDb = new ResourcesAsianMedia()

    commit('addProductDeletionPending', mediaId)
    await userProductsDb.delete(mediaId)
    commit('removeProductById', mediaId)
    commit('removeProductDeletionPending', mediaId)
    dispatch('getMedia')
  }
}
