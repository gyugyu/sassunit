import chokidar from 'chokidar'
import TestRunner, { TestRunnerOptions } from './TestRunner'

export default class Watcher {
  runner: TestRunner
  
  constructor(options: TestRunnerOptions) {
    this.runner = new TestRunner(options)
  }

  watch(path: string): void {
    chokidar.watch(path, { ignoreInitial: true })
      .on('add', this.runTest.bind(this))
      .on('change', this.runTest.bind(this))
  }

  private runTest(path: string): void {
    if (!path.match(/\.s[ac]ss$/)) {
      return
    }

    console.log(`Change detected: ${path}`)
    if (!path.match(/\.test\.s[ac]ss$/)) {
      path = path.replace(/(\.s[ac]ss)$/, '.test$1')
    }
    console.log(`Trying test execution for: ${path}`)

    const reporter = this.runner.runTests(path)
    reporter.report()

    console.log('')
  }
}
