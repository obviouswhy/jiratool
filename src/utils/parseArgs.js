export const parseArgs = argv => {
  return argv.slice(2).reduce((acc, arg) => {
    let [k, v = true] = arg.split('=')
    acc[k] = v
    return acc
  }, {})
}
