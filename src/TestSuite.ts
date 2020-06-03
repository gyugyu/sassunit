import sass from 'sass'

export default class TestSuite {
  file: string
  passingTestCount: number= 0
  errors: sass.SassException[] = []

  constructor(file: string) {
    this.file = file
  }

  pass() {
    this.passingTestCount++
  }

  fail(error: sass.SassException) {
    this.errors.push(error)
  }
}
