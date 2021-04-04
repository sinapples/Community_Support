<template>
  <v-card>
    <v-card-title>
      {{ editMode ? 'Edit' : 'Add' }} Media
      <v-spacer></v-spacer>
      <v-switch
        v-model="editMode"
        label="Edit"
        color="red"
        :disabled="!editMode"
        @click="addMode()"
      ></v-switch>
    </v-card-title>

    <v-card-text>
      <v-row class="px-2" no-gutters>
        <v-combobox
          v-model="formData.type"
          :items="mediaTypes"
          placeholder="Media Type"
          label="Media Type"
          dense
          outlined
        ></v-combobox>
        <v-text-field
          v-model="formData.name"
          outlined
          dense
          label="Name"
          placeholder="Name"
        ></v-text-field>
        <v-text-field
          v-model="formData.url"
          outlined
          dense
          label="url"
          placeholder="url"
        ></v-text-field>
        <v-text-field
          v-model="formData.author"
          outlined
          dense
          placeholder="author"
          label="author"
        ></v-text-field>
        <v-text-field
          v-model="formData.about"
          outlined
          dense
          placeholder="about"
          label="about"
        ></v-text-field>
        <v-text-field
          v-model="formData.description"
          outlined
          dense
          label="description"
          placeholder="description"
        ></v-text-field>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <!-- Edit Buttons -->
      <span v-if="editMode">
        <v-btn
          color="blue lighten-2"
          :loading="mediaCreationPending"
          class="mr-2"
          @click="addMedia"
        >
          New
        </v-btn>
        <v-btn
          color="green lighten-2"
          :loading="mediaCreationPending"
          class="mr-2"
          @click="editMedia"
        >
          Update
        </v-btn>
      </span>
      <!-- Add Button -->
      <span v-else>
        <v-btn
          color="blue lighten-2"
          :loading="mediaCreationPending"
          class="mr-2"
          @click="clear"
        >
          Clear
        </v-btn>
        <v-btn
          color="green lighten-2"
          :loading="mediaCreationPending"
          class="mr-2"
          @click="addMedia"
        >
          Create
        </v-btn>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

import { cloneDeep, isEmpty } from 'lodash'

export default {
  props: {
    editData: Object
  },
  data() {
    return {
      editMode: false,
      formData: {
        type: '',
        name: '',
        url: '',
        author: '',
        about: '',
        description: ''
      },
      mediaTypes: ['Video', 'Article', 'Book', 'Podcast', 'Movie']
    }
  },
  computed: {
    ...mapState('resources', ['mediaCreationPending', 'selectedMedia'])
  },

  watch: {
    selectedMedia(item) {
      if (!isEmpty(item)) {
        this.formData = cloneDeep(item)
        this.editMode = true
      } else {
        this.editMode = false
        this.clear()
      }
    }
  },
  methods: {
    ...mapMutations('resources', ['setMediaToCreate', 'setSelectedMedia']),
    ...mapActions('resources', ['createMedia', 'updateMedia']),
    addMode() {
      this.formData = {}
      this.setSelectedMedia({})
    },

    clear() {
      this.formData = {
        type: '',
        name: '',
        url: '',
        author: '',
        about: '',
        description: ''
      }
    },
    addMedia() {
      delete this.formData.id
      this.createMedia(this.formData)
    },
    editMedia() {
      if (this.selectedMedia.id) {
        this.formData.id = this.selectedMedia.id
        this.updateMedia(this.formData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>
