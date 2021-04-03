<template>
  <!-- <div class="page-wrapper"> -->
  <v-card color="green lighten-4" class="elevation-4">
    <v-sheet color="yellow lighten-4">
      <v-card-title class="justify-center"> {{ currentTab }}</v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn-toggle>
          <v-btn
            color="green lighten-4"
            depressed
            rounded
            large
            @click="currentTab = media"
            >Media</v-btn
          >
          <v-btn
            color="green lighten-4"
            depressed
            rounded
            large
            @click="currentTab = org"
            >Organizations</v-btn
          >
          <v-btn
            color="green lighten-4"
            depressed
            rounded
            large
            @click="currentTab = resources"
            >Resources</v-btn
          >
        </v-btn-toggle>
        <v-spacer />
      </v-card-actions>
    </v-sheet>
    <v-card-text>
      <!-- Media Tab -->
      <v-row v-if="currentTab === media && networkOnLine">
        <v-col cols="3">
          <AddMedia :edit-data="mediaRow" @refresh="refreashMedia" />
        </v-col>
        <v-col cols="9">
          <MediaTable :refresh="refresh" @media-row-click="saveMediaItem" />
        </v-col>
      </v-row>

      <!-- Orangization Tab -->
      <v-row v-if="currentTab === org">
        <v-col cols="3">
          <AddOrangization v-if="networkOnLine" />
        </v-col>
        <v-col cols="9">
          <OrangizationTable />
        </v-col>
      </v-row>

      <!-- Advice Tab -->
      <v-row v-if="currentTab === resources">
        <v-col cols="3">
          <AddAdvice v-if="networkOnLine" />
        </v-col>
        <v-col cols="9">
          <AdviceTable />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <!-- </div> -->
</template>

<script>
import { mapState } from 'vuex'

import MediaTable from '@/components/Media/MediaTable'
import AddMedia from '@/components/Media/AddMedia'

import OrangizationTable from '@/components/Orangization/OrangizationTable'
import AddOrangization from '@/components/Orangization/AddOrangization'

import AdviceTable from '@/components/Advice/AdviceTable'
import AddAdvice from '@/components/Advice/AddAdvice'

export default {
  components: {
    AddMedia,
    MediaTable,
    AdviceTable,
    AddAdvice,
    OrangizationTable,
    AddOrangization
  },
  data() {
    return {
      refresh: false,
      mediaRow: {},
      media: 'Media',
      org: 'Organizations',
      resources: 'Resources',
      currentTab: 'Media'
    }
  },

  computed: mapState('app', ['networkOnLine']),
  methods: {
    saveMediaItem(item) {
      this.mediaRow = item
    },
    refreashMedia() {
      console.log('admin')
      this.refresh = !this.refresh
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.products-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.product-list {
  margin: 20px 0;
}
</style>
