import sass from 'sass'

export interface Reporter {
  report(): sass.types.Number
}

const reporter: Reporter = {
  report() {
    process.stdout.write('.')
    return new sass.types.Number(0)
  }
}

export default reporter
