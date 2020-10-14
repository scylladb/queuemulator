import _ from 'lodash'

export function mm1(rho) {
    return rho / (1 - rho)
}

export function factorial(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}


export function functionSeries(func, start=0, end=1, delta=0.01, ymax=undefined) {
    let x = _.range(start, end, delta)
    let y = _.map(x, func)
    if (!_.isUndefined(ymax)) {
      var xmax = _.last(x)
      var ylast = _.last(y)
      var i = 1
      while (ylast < ymax && i < 20) {
        xmax = end - delta**i
        ylast = func(xmax)
        i++
        y.push(ylast)
        x.push(xmax)
      }
    }
    return [['x', ...x], ['y', ...y]]
}
  