const noop = _ => void 0
const $$get = Symbol('$$get')

class Chain {
  constructor (src, pipes = []) {
    this._src = src
    this._pipes = pipes

    return new Proxy(noop, {
      get: (target, prop) => {
        if (prop === $$get) return Reflect.get(this, $$get, this)
        return new Chain(src, pipes.concat(cur => haveProps(cur) ? cur[prop] : undefined))
      },

      apply (target, thisArg, args) {
        return new Chain(src, pipes.concat((cur, prev) => cur && cur.apply(prev, args)))
      }
    })
  }

  get [$$get] () {
    return this._pipes
      .reduce(
        ({cur, prev}, pipe) => ({ cur: pipe(cur, prev), prev: cur }),
        {cur: this._src, prev: null}
      ).cur
  }
}

const nullable2 = module.exports = (src, fn) =>
  fn ? fn(new Chain(src))[$$get]
    : fn => nullable2(src, fn)

function haveProps (val) {
  return val !== null && val !== undefined
}
