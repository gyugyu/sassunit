import sassunit from '../src'

describe('sassunit', () => {
  it('has no error on passing test', () => {
    const reporter = sassunit('test/fixtures/pass.test.scss')
    expect(reporter.hasError()).toBeFalsy()
  })

  it('can observe failure on failing test', () => {
    const reporter = sassunit('test/fixtures/fail.test.scss')
    expect(reporter.hasError()).toBeTruthy()
  })
})
