import GenericDB from './generic-db'

export default class Media extends GenericDB {
  constructor(userId) {
    super(`resources/media/youtube`)
    console.log(userId)
  }

  // Here you can extend UserProductsDB with custom methods
}
