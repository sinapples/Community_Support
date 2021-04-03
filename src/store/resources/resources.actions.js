import UserProductsDB from '@/firebase/user-products-db'
import ResourcesAsianMedia from '@/firebase/resources-asian-media'

export default {
  /**
   * Fetch products of current loggedin user
   */
  getMedia: async ({ commit }) => {
    const db = new ResourcesAsianMedia()

    const media = await db.readAll()
    commit('setMedia', media)
  },

  /**
   * Create a product for current loggedin user
   */
  createMedia: async ({ commit }, product) => {
    const userProductDb = new ResourcesAsianMedia()

    commit('setMediaCreationPending', true)
    const createdProduct = await userProductDb.create(product)
    commit('addMedia', createdProduct)
    commit('setMediaCreationPending', false)
  },

  /**
   * Create a new product for current loggedin user and reset product name input
   */
  triggerAddMediaAction: ({ dispatch, state, commit }) => {
    if (state.productNameToCreate === '') return

    const product = { name: state.productNameToCreate }
    commit('setProductNameToCreate', '')
    dispatch('createUserProduct', product)
  },

  /**
   * Delete a user product from its id
   */
  deleteUserProduct: async ({ rootState, commit, getters }, productId) => {
    if (getters.isProductDeletionPending(productId)) return

    const userProductsDb = new UserProductsDB(rootState.authentication.user.id)

    commit('addProductDeletionPending', productId)
    await userProductsDb.delete(productId)
    commit('removeProductById', productId)
    commit('removeProductDeletionPending', productId)
  }
}
