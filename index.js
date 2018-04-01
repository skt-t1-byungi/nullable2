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
        return new Chain(src, pipes.concat((cur, prev) => isFunc(cur) ? cur.apply(prev, args) : undefined))
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

function haveProps (val) { return val !== null && val !== undefined }
function isFunc (fn) { return typeof fn === 'function' }

const nullable2 = module.exports = (src, fn) =>
  fn ? fn(new Chain(src))[$$get]
    : fn => nullable2(src, fn)
