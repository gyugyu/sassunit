import sass from 'sass'
import TestSuite from './TestSuite'

export interface Reporter {
  pass(): sass.types.Number
  fail(error: sass.SassException): void
  report(): void
  hasError(): boolean
}

class DefaultReporter implements Reporter {
  testSuites: TestSuite[] = []
  
  setupTestSuite(testSuite: TestSuite) {
    this.testSuites.push(testSuite)
  }

  pass() {
    process.stdout.write('.')
    this.testSuites[this.testSuites.length - 1].pass()
    return new sass.types.Number(0)
  }

  fail(error: sass.SassException) {
    process.stdout.write('x')
    this.testSuites[this.testSuites.length - 1].fail(error)
  }

  report() {
    console.log('')
    const passedTestCount = this.testSuites.reduce((count, suite) => {
      return count + suite.passingTestCount
    }, 0)
    console.log(`passed: ${passedTestCount}`)

    const errorCount = this.testSuites.reduce((count, suite) => {
      return count + suite.errors.length
    }, 0)
    console.log(`failed: ${errorCount}`)

    this.testSuites.forEach(testSuite => {
      if (testSuite.errors.length > 0) {
        console.error(`${testSuite.file}:`)
        testSuite.errors.forEach(error => {
          console.error(error.message)
        })
      }
    })
  }

  hasError() {
    const errorCount = this.testSuites.reduce((count, suite) => {
      return count + suite.errors.length
    }, 0)
    return errorCount > 0
  }
}

const reporter = new DefaultReporter()
export default reporter
