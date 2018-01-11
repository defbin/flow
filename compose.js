function noop() {}

export default function compose(fns) {
  return (ctx, next = noop) => {
    return fns.reduceRight((next, fn) => {
      return async () => fn(ctx, next)
    }, next)()
  }
}
