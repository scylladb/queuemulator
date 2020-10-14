<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-row>
          <v-col>
            <v-subheader>Model</v-subheader>
          </v-col>
          <v-col>
            <v-select single-line :items="formulas" label="Models" v-model="formula"></v-select>
          </v-col>
        </v-row>
      </div>
      
      <v-spacer></v-spacer>
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
      formula: 'Kingman',
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
