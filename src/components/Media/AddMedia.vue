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
      <v-btn color="green ligten-3" @click="addMedia">
        {{ !editMode ? 'Create' : 'Update' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
// import ResourcesAsianMedia from '@/firebase/resources-asian-media'
import { cloneDeep } from 'lodash'

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
        description: '',
        id: ''
      },
      mediaTypes: ['Video', 'Article', 'Book', 'Podcast', 'Movie']
    }
  },
  computed: mapState('products', [
    'productNameToCreate',
    'productCreationPending'
  ]),

  watch: {
    editData(editData) {
      console.log(`watch ${editData}`)
      this.formData = cloneDeep(editData)

      this.editMode = true
    }
  },
  methods: {
    ...mapMutations('resources', ['setMediaToCreate']),
    ...mapActions('resources', ['triggerAddMediaAction']),
    addMode() {
      this.formData = {}
    },
    async addMedia() {
      // const db = new ResourcesAsianMedia()
      // // console.log(JSON.stringify(this.formData))
      // if (this.editMode) {
      //   await db.update(this.formData)
      //   this.$emit('refresh', 'media')
      // } else {
      //   await db.create(this.formData)
      //   this.$emit('refresh', 'media')
      // }
      this.setMediaToCreate(this.formData)
      this.triggerAddMediaAction()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.product-action-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  .product-name-input {
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
  }

  .create-product-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    border-color: #2c3e50;

    &.disabled {
      pointer-events: none;
      background-color: #aaa;
    }

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
