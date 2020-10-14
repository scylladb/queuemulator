<template>
    <v-container>
        <v-row>
            <Chart :data="data" xlabel="ρ" ylabel="Queueing latency"></Chart>
        </v-row>
        <v-row>
            <v-slider label="µ" hint="Service rate" min="1" max="10" step="0.25" v-model="mu"></v-slider>
            <p>µ = {{mu}}</p>
        </v-row>
    </v-container>
</template>

<script>
import Chart from './Chart.vue'
import {mm1, functionSeries} from '../common'

function mm1Latency(rho, mu) {
    return mm1(rho) / rho / mu
}

export default {
    components: {Chart},
    data() {
        return {
            mu: 1
        }
    },
    computed: {
        data() {
            return functionSeries((r) => mm1Latency(r, this.mu), 0, 1, 0.01, 100)
        }
    }
}
</script>