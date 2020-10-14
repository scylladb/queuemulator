<template>
    <v-container>
        <v-row>
        <Chart name="queue" ylabel="Queueing latency" xlabel="ρ" :data="data"></Chart>
        </v-row>
        <v-row>
            <v-slider label="µ" hint="Service rate" min="1" max="10" step="0.25" v-model="mu"></v-slider>
            <p>µ = {{mu}}</p>
        </v-row>
        <v-row>
          <v-slider label="Workers" hint="workers" min="1" max="10" step="1" v-model="workers"></v-slider>
          <p>Workers = {{workers}}</p>
        </v-row>
    </v-container>
</template>

<script>
import {functionSeries, factorial} from '../common.js'
import Chart from './Chart.vue'

function sumSeries(from, to, func) {
    var s = 0
    for (var i=from; i < to; i++) {
        s += func(i)
    }
    return s
}

function erlangC(c, r) {
    return 1 / (1 + (1 - r)*factorial(c)/((c*r)**c) * sumSeries(0, c - 1, (k) => (c*r)**k/factorial(k)) )
}

function mmcLatency(workers, rho, mu) {
    let r = rho * workers
    let lambda = rho * mu * workers
    return erlangC(workers, r) / (workers * mu - lambda) + 1 / mu
}

export default {
  components: {Chart},
  data: () => ({
      workers: 1,
      mu: 1
  }),
  computed: {
    data() {
      return functionSeries(x => mmcLatency(this.workers, x, this.mu), 0, 1, 0.005, 100)
    },
  },
  updated() {
      window.MathJax.typeset()
  },
  watch: {
  }
}
</script>