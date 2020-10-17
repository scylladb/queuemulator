<template>
    <v-container>
        <v-row>
            <Chart :data="data" xlabel="ρ" ylabel="Queueing latency"></Chart>
        </v-row>
        <v-row>
            <v-slider label="µ" hint="Service rate" min="1" max="10" step="0.25" v-model="mu"></v-slider>
            <p>µ = {{mu}}</p>
        </v-row>
        <v-row>
            <v-col>
                <v-row>
                    <a href="https://en.wikipedia.org/wiki/M/M/1_queue">The M/M/1 model</a>
                </v-row>
                <v-row>
                    <p>\[ \mathbb {E} [W_q] = \tau \frac {\rho} {1 - \rho} \]</p>
                </v-row>
            </v-col>
            <v-col>
                <h3>Legend</h3>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td>\( \mathbb E [W_q] \)</td>
                            <td>Expectation value of wait time; Mean latency</td>
                        </tr>
                        <tr>
                            <td>\( \rho = \frac \lambda \mu \)</td>
                            <td>Utilization</td>
                        </tr>
                        <tr>
                            <td>\( \mu \)</td>
                            <td>Service rate mean</td>
                        </tr>
                        <tr>
                            <td>\( \lambda \)</td>
                            <td>Arrival rate mean</td>
                        </tr>
                        <tr>
                            <td>\( \tau = \frac 1 \mu \)</td>
                            <td>Service time mean</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>            
        </v-row>
    </v-container>
</template>

<script>
import Chart from './Chart.vue'
import {mm1, functionSeries} from '../common'

function mm1Latency(rho, mu) {
    return mm1(rho) / mu
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
            return [{...functionSeries((r) => mm1Latency(r, this.mu), 0, 1, 0.01, 100), name: 'mm1'}]
        }
    },
    mounted() {
        if (window.MathJax) {
            window.MathJax.typeset()
        }
    }
}
</script>