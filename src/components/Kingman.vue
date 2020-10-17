<template>
    <v-container>
        <v-row>
        <Chart name="queue" ylabel="Queueing latency" xlabel="ρ" :data="data"></Chart>
        </v-row>
        <v-row>
            <v-col>
                <v-slider label="\( c_s \)" hint="Service rate variation" min="0.1" max="5" step="0.1" v-model="c_s"></v-slider>
                <p>= {{c_s}}</p>
            </v-col>
            <v-col>
                <v-slider label="\( c_a \)" hint="Arrival rate variation" min="0.1" max="5" step="0.1" v-model="c_a"></v-slider>
                <p>= {{c_a}}</p>
            </v-col>
        </v-row>
        <v-row>
          <v-slider label="\( \mu \)" hint="Service rate" min="1" max="10" step="0.25" v-model="mu"></v-slider>
          <p v-text="muFormula"></p>
        </v-row>
        <v-row>
            <v-col>
                <v-row>
                    <p><a href="https://en.wikipedia.org/wiki/Kingman%27s_formula">Kingman's formula</a></p>
                </v-row>
                <v-row>
                    <p>\[ \mathbb {E} [W_q] \approx \left( \frac {\rho} {1 - \rho} \right) \left( \frac {c_a^2 + c_s^2} {2} \right) \tau \]</p>
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
                            <td>\( \lambda \)</td>
                            <td>Arrival rate mean</td>
                        </tr>
                        <tr>
                            <td>\( \mu \)</td>
                            <td>Service rate mean</td>
                        </tr>
                        <tr>
                            <td>\( \tau = \frac 1 \mu \)</td>
                            <td>Service time mean</td>
                        </tr>
                        <tr>
                            <td>\( c_s \)</td>
                            <td>Service rate coefficient of variation (standard deviation / mean)</td>
                        </tr>
                        <tr>
                            <td>\( c_a \)</td>
                            <td>Arrival rate coefficient of varation (standard deviation / mean)</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import {functionSeries, mm1} from '../common.js'
import Chart from './Chart.vue'

function kingman(rho, c_a, c_s, mu) {
    let tau = 1 / mu
    return mm1(rho) * (c_a**2 + c_s**2) / 2 * tau
}

export default {
  components: {Chart},
  data: () => ({
    c_a: 0.5,
    c_s: 0.5,
    mu: 1
  }),
  computed: {
    data() {
      return [{...functionSeries(x => kingman(x, this.c_a, this.c_s, this.mu), 0, 1, 0.01, 100), name: 'kingman'},
        {...functionSeries(x => kingman(x, 1/Math.sqrt(x*this.mu), 1, this.mu), 0, 1, 0.01, 100), name: 'kingman_mm1'},
        {...functionSeries(r => mm1(r) / this.mu, 0, 1, 0.01, 100), name: 'mm1'}
      ]
    },
    muFormula() {
        return `\\( \\mu = ${this.mu}\\)`
    }
  },
  methods: {
      typeset() {
          if (window.MathJax) {
              window.MathJax.typeset()
          }
      }
  },
  mounted() {
      this.typeset()
  },
  updated() {
      this.typeset()
  },
 }
</script>