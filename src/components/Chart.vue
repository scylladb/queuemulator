<template>
    <div :id="id"></div>
</template>

<script>
import c3 from 'c3'
import _ from 'lodash'

export default {
    props: ['data', 'name', 'xlabel', 'ylabel'],
    computed: {
        id() {
            return `chart-${this.name}`
        }
    },
    mounted() {
        this._chart = c3.generate({
            bindto: '#' + this.id,
            data: {
                columns: this.data,
                x: 'x',
                type: 'line',
            },
            point: {
                show: false
            },
            axis: {
                x: {
                    label: this.xlabel,
                    max: 1,
                    tick: {
                        values: _.range(0, 1, 0.1),
                        format: x => x.toPrecision(2)
                    }
                },
                y: {
                    label: this.ylabel,
                    max: 100
                }
            }
        })
    },
    watch: {
        data(d) {
            this._chart.load({columns: d})
        }
    }
}
</script>