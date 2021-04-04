import { find } from 'lodash'

export default {
  /**
   * Check if a media has deletion pending
   */
  isMediaDeletionPending: state => mediaId =>
    state.mediaDeletionPending.includes(mediaId),

  /**
   * Get media by id
   */
  getMediaById: state => mediaId =>
    find(state.mediaData, media => media.id === mediaId)
}
