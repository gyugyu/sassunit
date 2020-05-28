import program from 'commander'
import sassunit from './index'

const pkgJson: { version: string } = require('../package.json')

function separateByColon(value: string): string[] {
  return value.split(':')
}

program
  .version(pkgJson.version)
  .arguments('[file]')
  .option('-I --include-paths <path>', 'include paths', separateByColon)


program.parse(process.argv)

const options = {
  includePaths: program.includePaths as undefined | string[]
}

const file = program.file ?? '**/*.test.scss'

const hasError = sassunit(file, options)

if (hasError) {
  process.exit(1)
}
