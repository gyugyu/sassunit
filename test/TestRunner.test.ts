import TestRunner from '../src/TestRunner'
import SassUnitTestRunner from '../src/TestRunner'

describe('sassunit', () => {
  it('has no error on passing test', () => {
    const testRunner = new SassUnitTestRunner({})
    const reporter = testRunner.runTests('test/fixtures/pass.test.scss')
    expect(reporter.hasError()).toBeFalsy()
  })

  it('can observe failure on failing test', () => {
    const testRunner = new SassUnitTestRunner({})
    const reporter = testRunner.runTests('test/fixtures/fail.test.scss')
    expect(reporter.hasError()).toBeTruthy()
  })
})
