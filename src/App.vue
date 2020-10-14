<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title dense>QueueMulator</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-container>
        <v-row class="d-flex">
          <v-col colls="2" sm="1">
            <v-subheader>Model</v-subheader>
          </v-col>
          <v-col colls="6" sm="2">
            <v-select dense single-line :items="formulas" label="Models" v-model="formula"></v-select>
          </v-col>
        </v-row>
      </v-container>
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
    // sigmaService(s) {
    //   console.log(s)
    // }
  }
};
</script>
