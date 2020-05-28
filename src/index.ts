import fs from 'fs'
import glob from 'glob'
import path from 'path'
import sass from 'sass'
import reporter from './reporter'

const runner = fs.readFileSync(path.join(__dirname, '../_index.scss'), 'utf8')

interface Options {
  includePaths?: string[]
}

export default function index(file: string, options: Options = {}) {
  const includePaths = options.includePaths ?
    [process.cwd()].concat(options.includePaths) :
    [process.cwd()]

  const files = glob.sync(file)
  files.forEach(f => {
    try {
      sass.renderSync({
        data: `
@use '${f}' as test-suite;
${runner}
        `,
        includePaths,
        functions: {
          ...reporter
        }
      })
    } catch (e) {
      console.error(e)
    }
  })
}
