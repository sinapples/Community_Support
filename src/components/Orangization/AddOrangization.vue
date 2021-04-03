<template>
  <div data-app>
    <v-card>
      <v-card-title>
        Add Organization
      </v-card-title>
      <v-card-text>
        <v-row class="px-2" no-gutters>
          <v-text-field
            v-model="name"
            outlined
            dense
            placeholder="Name"
          ></v-text-field>
          <v-text-field
            v-model="url"
            outlined
            dense
            placeholder="url"
          ></v-text-field>
          <v-text-field
            v-model="twitter"
            outlined
            dense
            placeholder="twitter"
          ></v-text-field>
          <v-text-field
            v-model="oneLiner"
            outlined
            dense
            placeholder="One line description"
          ></v-text-field>
          <v-text-field
            v-model="description"
            outlined
            dense
            placeholder="description"
          ></v-text-field>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="addMedia">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import ResourcesAsianOrganization from '@/firebase/resources-asian-organization'

export default {
  data() {
    return {
      type: '',
      name: '',
      url: '',
      twitter: '',
      oneLiner: '',
      description: ''
    }
  },
  computed: mapState('products', [
    'productNameToCreate',
    'productCreationPending'
  ]),
  methods: {
    ...mapMutations('products', ['setProductNameToCreate']),
    ...mapActions('products', ['triggerAddProductAction']),

    addMedia() {
      const db = new ResourcesAsianOrganization()
      const data = {
        type: this.type,
        name: this.name,
        url: this.url,
        twitter: this.twitter,
        oneLiner: this.oneLiner,
        description: this.description
      }
      db.create(data)
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
