<template>
  <v-card>
    <v-data-table
      :items="mediaData"
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
        <v-btn
          icon
          color="error"
          :loading="isMediaDeletionPending(deleteItem.id)"
          @click.stop="deleteRow(item)"
        >
          <v-icon>mdi-delete</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  props: {
    refresh: Boolean
  },
  data() {
    return {
      // mediaData: [],
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
    ...mapState('resources', ['mediaData', 'selectedMedia']),
    ...mapGetters('resources', ['isMediaDeletionPending'])
  },
  watch: {},

  methods: {
    ...mapMutations('resources', ['setSelectedMedia']),
    ...mapActions('resources', ['deleteMedia']),
    deleteRow(item) {
      console.log(`delete ${item.name}`)
      this.deleteItem = item
    },

    onRowClick(item) {
      this.deleteItem = {}

      console.log(item)
      if (item === this.selectedMedia) {
        this.setSelectedMedia({})
      } else {
        this.setSelectedMedia(item)
      }
    },
    confirmDelete() {
      console.log()
      if (this.selectedMedia.id === this.deleteItem.id) {
        this.setSelectedMedia({})
      }

      this.deleteMedia(this.deleteItem.id)
      this.deleteItem = {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>
