import fs from 'fs'
import glob from 'glob'
import path from 'path'
import sass from 'sass'
import reporter, { Reporter } from './reporter'
import TestSuite from './TestSuite'

const runner = fs.readFileSync(path.join(__dirname, '../_index.scss'), 'utf8')

interface Options {
  includePaths?: string[]
}

export default function index(file: string, options: Options = {}): Reporter {
  const includePaths = options.includePaths ?
    [process.cwd()].concat(options.includePaths) :
    [process.cwd(), 'node_modules']

  const files = glob.sync(file, { ignore: 'node_modules/**/*' })
  files.forEach(f => {
    reporter.setupTestSuite(new TestSuite(f))
    try {
      sass.renderSync({
        data: `
@use '${f}' as test-suite;
${runner}
        `,
        includePaths,
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
