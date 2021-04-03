<template>
  <v-card>
    <v-card-title>
      Add Resource
    </v-card-title>
    <v-card-text>
      <v-row class="px-2" no-gutters>
        <v-text-field
          v-model="topic"
          :items="mediaTypes"
          placeholder="Topic"
          dense
          outlined
        ></v-text-field>
        <v-text-field
          v-model="advice"
          outlined
          dense
          placeholder="Advice"
        ></v-text-field>
        <v-text-field
          v-model="url"
          outlined
          dense
          placeholder="url"
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
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import ResourcesAsianAdvice from '@/firebase/resources-asian-advice'

export default {
  data() {
    return {
      topic: '',
      advice: '',
      url: ''
    }
  },
  computed: mapState('products', [
    'productNameToCreate',
    'productCreationPending'
  ]),
  methods: {
    ...mapMutations('products', ['setProductNameToCreate']),
    ...mapActions('products', ['triggerAddProductAction']),

    async addMedia() {
      const db = new ResourcesAsianAdvice()
      const data = {
        topic: this.topic,
        advice: this.advice,
        url: this.url
      }
      await db.create(data)
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

  .product-advice-input {
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
