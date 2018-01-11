export function fork(cond, func) {
  return async (ctx, next) => {
    let forked = false
    const rv = await cond(ctx, () => {
      forked = true
      return func(ctx, next)
    })

    return forked ? rv : next()
  }
}

export function conditional(predicate) {
  return async (ctx, next) => {
    if (await predicate(ctx)) {
      return next()
    }
  }
}
