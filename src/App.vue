<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <v-row class="d-flex">
        <v-col colls="12" sm="2">
          <a href="http://www.scylladb.com/">
            <v-img src="scylla-monster.png" max-height="50" max-width="75" contain></v-img>        
          </a>
        </v-col>
        <v-col colls="12" sm="2">
        <v-toolbar-title>QueueMulator</v-toolbar-title>
        </v-col>
          <v-col colls="12" sm="1">
            <v-subheader>Model</v-subheader>
          </v-col>
          <v-col colls="12" sm="2">
            <v-select dense single-line :items="formulas" label="Models" v-model="formula"></v-select>
          </v-col>
        <v-spacer></v-spacer>
        </v-row>
    </v-app-bar>

    <v-main>
      <v-container>
        <component :is="formula" ></component>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Kingman from './components/Kingman.vue'
import MM1 from './components/MM1.vue'
import MMC from './components/MMC.vue'

export default {
  name: 'App',
  data() {
    return {
      formula: 'MM1',
      formulas: ['Kingman', 'MM1', 'MMC']
    }
  },
  components: {
    Kingman,
    MM1,
    MMC
  },
  watch: {
  }
};
</script>
