<template>
  <v-card>
    <v-data-table
      :items="mediaData"
      :headers="headers"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
import ResourcesAsianOrganization from '@/firebase/resources-asian-organization'

export default {
  data() {
    return {
      mediaData: [],
      headers: [
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'One Line',
          align: 'start',
          sortable: false,
          value: 'oneLiner'
        },
        {
          text: 'description',
          align: 'start',
          sortable: false,
          value: 'description'
        },
        {
          text: 'Twitter',
          align: 'start',
          sortable: false,
          value: 'twitter'
        },
        {
          text: 'url',
          align: 'start',
          sortable: false,
          value: 'url'
        },
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id'
        }
      ]
    }
  },

  async mounted() {
    const db = new ResourcesAsianOrganization()
    this.mediaData = await db.readAll()
  },
  methods: {
    addMedia() {
      const db = new ResourcesAsianOrganization()
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
