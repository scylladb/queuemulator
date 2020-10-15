<template>
    <v-container>
        <v-row>
        <Chart name="queue" ylabel="Queueing latency" xlabel="ρ" :data="data"></Chart>
        </v-row>
        <v-row>
            <p><a href="https://en.wikipedia.org/wiki/Kingman%27s_formula">Kingman's formula</a></p>
        </v-row>
        <v-row>
            <v-col>
                <v-slider label="\( \sigma_\mu \)" hint="Service rate stderr" min="0.01" max="5" step="0.05" v-model="sigmaService"></v-slider>
                <p>= {{sigmaService}}</p>
            </v-col>
            <v-col>
                <v-slider label="\( \sigma_\lambda \)" hint="Arrival rate stderr" min="0.01" max="5" step="0.05" v-model="sigmaArrival"></v-slider>
                <p>= {{sigmaArrival}}</p>
            </v-col>
        </v-row>
        <v-row>
          <v-slider label="\( \mu \)" hint="Service rate" min="1" max="10" step="0.25" v-model="mu"></v-slider>
          <p v-text="muFormula"></p>
        </v-row>
        <v-row>
            <v-col>
                <v-row>
                    <p>\[ \mathbb {E} [W_q] \approx \left( \frac {\rho} {1 - \rho} \right) \left( \frac {\lambda^2 \sigma_s^2 + \mu^2 \sigma_a^2} {2} \right) \mu \]</p>
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
                            <td>\( \sigma_s \)</td>
                            <td>Service rate standard deviation</td>
                        </tr>
                        <tr>
                            <td>\( \lambda \)</td>
                            <td>Arrival rate mean</td>
                        </tr>
                        <tr>
                            <td>\( \sigma_a \)</td>
                            <td>Arrival rate standard deviation</td>
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

function kingman(lambda, mu, sigmaLambda, sigmaMu) {
    let rho = lambda / mu
    return mm1(rho) * (sigmaMu**2 * lambda**2 + sigmaLambda**2 * mu**2) / 2 * mu
}

export default {
  components: {Chart},
  data: () => ({
    sigmaService: 0.1,
    sigmaArrival: 0.1,
    mu: 1
  }),
  computed: {
    data() {
      return functionSeries(x => kingman(x * this.mu, this.mu, this.sigmaArrival, this.sigmaService), 0, 1, 0.005, 100)
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