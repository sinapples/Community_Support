<template>
  <v-card>
    <v-data-table
      :items="mediaData"
      :headers="headers"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:[`item.action`]="{}">
        <v-btn>Del</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ResourcesAsianAdvice from '@/firebase/resources-asian-advice'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      mediaData: [],
      headers: [
        {
          text: 'Topic',
          align: 'start',
          sortable: false,
          value: 'topic'
        },
        {
          text: 'Advice',
          align: 'start',
          sortable: false,
          value: 'advice'
        },
        {
          text: 'url',
          align: 'start',
          sortable: false,
          value: 'URL'
        },
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'action'
        }
      ]
    }
  },
  computed: {
    // ...mapGetters('products', ['isProductDeletionPending']),
    ...mapState('resources', ['media']),
    ...mapState('app', ['networkOnLine'])
  },

  async mounted() {
    const db = new ResourcesAsianAdvice()
    this.mediaData = await db.readAll()
  },
  methods: {
    addMedia() {
      const db = new ResourcesAsianAdvice()
      const data = {
        type: this.type,
        name: this.name,
        url: this.url,
        author: this.author,
        about: this.about,
        description: this.description,
        mediaTypes: this.mediaTypes
      }
      db.create(data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>
