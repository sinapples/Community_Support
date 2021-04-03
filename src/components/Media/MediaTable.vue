<template>
  <v-card>
    <v-data-table
      :items="media"
      :headers="headers"
      :items-per-page="10"
      class="elevation-1"
      @click:row="onRowClick"
    >
      <template v-slot:top>
        <v-card-title>
          Media <v-spacer></v-spacer>

          <v-sheet v-if="deleteItem.id" color="">
            <!-- <v-card-text>Delete</v-card-text>  -->
            <span class="pa-2">
              Are you sure you want to delete {{ deleteItem.name }}?
            </span>
            <v-btn small dark color="red" class="mr-2" @click="confirmDelete"
              >Yes</v-btn
            >
            <v-btn small dark color="" class="mr-2" @click="deleteItem = {}"
              >no</v-btn
            >
          </v-sheet>
        </v-card-title>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn icon color="error" @click.stop="deleteRow(item)">
          <v-icon>mdi-delete</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ResourcesAsianMedia from '@/firebase/resources-asian-media'
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    refresh: Boolean
  },
  data() {
    return {
      mediaData: [],
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'action'
        },
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'About',
          align: 'start',
          sortable: false,
          value: 'about'
        },
        {
          text: 'description',
          align: 'start',
          sortable: false,
          value: 'description'
        },
        {
          text: 'type',
          align: 'start',
          sortable: false,
          value: 'type'
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
          value: 'id',
          width: '20px'
        }
      ],
      // add more variables here
      deleteItem: {}
    }
  },
  computed: {
    // ...mapGetters('products', ['isProductDeletionPending']),
    ...mapState('resources', ['media']),
    ...mapState('app', ['networkOnLine'])
  },
  watch: {
    async refresh() {
      this.updateTable()
    }
  },

  async mounted() {
    // if (!this.media) {
    mapActions('app', ['getMedia'])
    // }
  },
  methods: {
    deleteRow(item) {
      console.log(`delete ${item.name}`)
      this.deleteItem = item
    },
    async updateTable() {
      const db = new ResourcesAsianMedia()
      this.mediaData = await db.readAll()
    },
    onRowClick(item) {
      this.deleteItem = {}
      this.$emit('media-row-click', item)
    },
    addMedia() {
      const db = new ResourcesAsianMedia()
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
    },
    async confirmDelete() {
      // console.log(JSON.stringify(this.deleteItem))
      const db = new ResourcesAsianMedia()
      await db.delete(this.deleteItem.id)
      await this.updateTable()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>
