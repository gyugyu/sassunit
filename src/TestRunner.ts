import fs from 'fs'
import glob from 'glob'
import path from 'path'
import sass from 'sass'
import { DefaultReporter, Reporter } from './Reporter'
import TestSuite from './TestSuite'

const runner = fs.readFileSync(path.join(__dirname, '../_index.scss'), 'utf8')

export interface TestRunnerOptions {
  includePaths?: string[]
}

export default class TestRunner {
  includePaths: string[]
  
  constructor(options: TestRunnerOptions) {
    this.includePaths = options.includePaths ?
    [process.cwd()].concat(options.includePaths) :
    [process.cwd(), 'node_modules']
  }

  runTests(file: string): Reporter {
    const reporter = new DefaultReporter()
    const files = glob.sync(file, { ignore: 'node_modules/**/*' })
    files.forEach(f => {
      reporter.setupTestSuite(new TestSuite(f))
      try {
        sass.renderSync({
          data: `
@use '${f}' as test-suite;
${runner}
          `,
          includePaths: this.includePaths,
          functions: {
            pass: reporter.pass.bind(reporter)
          }
        })
      } catch (error) {
        reporter.fail(error)
      }
    })
    return reporter
  }
}
