import compose from './compose'

function createMiddleware(arg) {
  if (arg instanceof Layer) {
    return arg.asMiddleware()
  } else if (Array.isArray(arg)) {
    return compose(arg.map(createMiddleware))
  } else {
    return arg
  }
}

class Layer {
  constructor() {
    this._middlewares = []
  }

  use(mw) {
    this._middlewares.push(mw)
    return this
  }

  asMiddleware() {
    return createMiddleware(this._middlewares)
  }

  run(ctx, next) {
    const mw = this.asMiddleware()
    return mw(ctx, next)
  }
}

export default Layer
