import fs from 'fs'
import glob from 'glob'
import path from 'path'
import sass from 'sass'

const runner = fs.readFileSync(path.join(__dirname, '../_index.scss'), 'utf8')

interface Options {
  includePaths?: string[]
}

export default function index(file: string, options: Options = {}) {
  const includePaths = options.includePaths ?
    [process.cwd()].concat(options.includePaths) :
    [process.cwd()]

  try {
    const result = sass.renderSync({
      data: `
@use '${file}' as test-suite;
${runner}
      `,
      includePaths
    })
    console.log(result.css.toString())
  } catch (e) {
    console.error(e)
  }
}
