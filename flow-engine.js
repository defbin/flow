import Layer from './layer'
import * as util from './util'

class ControlFlow extends Layer {
  constructor(parent = null) {
    super()
    this._parent = parent
  }

  parent() {
    return this._parent
  }

  end() {
    return this.use(() => {}))
  }

  fork(condition) {
    const nested = new this.constructor(this)
    this.use(util.fork(condition, (ctx, next) => nested.run(ctx, next)))
    return nested
  }

  when(cond) {
    return this.fork(util.conditional(cond))
  }

  unless(cond) {
    return this.when(async ctx => !await cond(ctx))
  }

  done() {
    return this.end().parent()
  }
}

export default ControlFlow
