<template>
    <div :id="id"></div>
</template>

<script>
import c3 from 'c3'
import _ from 'lodash'

function dataToGraph(data) {
    return _.reduce(data, (d, {name, x, y}) => {
        d.columns.push([name, ...y])
        d.columns.push(['x_' + name, ...x])
        d.xs[name] = 'x_' + name
        return d
    }, {columns: [], xs: {}, type: 'line'})
}

export default {
    props: ['data', 'name', 'xlabel', 'ylabel'],
    computed: {
        id() {
            return `chart-${this.name}`
        },
        graphData: (vm) => {
            return dataToGraph(vm.data)
        }
    },
    mounted() {
        this._chart = c3.generate({
            bindto: '#' + this.id,
            data: this.graphData,
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
        data(_data) {
            if (!_.isEmpty(_data)) {
                this._chart.load(dataToGraph(_data))
            }
        }
    }
}
</script>