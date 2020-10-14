import program from 'commander'
import sassunit from './index'

const pkgJson: { version: string } = require('../package.json')

function separateByColon(value: string): string[] {
  return value.split(':')
}

interface Command {
  includePaths?: string[]
}

program
  .version(pkgJson.version)
  .arguments('[file]')
  .option('-I --include-paths <path>', 'include paths', separateByColon)
  .action((file: string | undefined, cmd: Command) => {
    file = file ?? '**/*.test.scss'

    const reporter = sassunit(file, {
      includePaths: cmd.includePaths
    })

    reporter.report()

    if (reporter.hasError()) {
      process.exit(1)
    }
  })

program.parse(process.argv)
