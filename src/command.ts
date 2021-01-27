import program from 'commander'
import TestRunner from './TestRunner'
import Watcher from './Watcher'

const pkgJson: { version: string } = require('../package.json')

function separateByColon(value: string): string[] {
  return value.split(':')
}

interface Command {
  includePaths?: string[]
  watch: boolean
}

program
  .version(pkgJson.version)
  .arguments('[pathOrGlob]')
  .option('-w --watch', 'watch mode')
  .option('-I --include-paths <path>', 'include paths', separateByColon)
  .action((pathOrGlob: string | undefined, cmd: Command) => {
    if (cmd.watch) {
      if (!pathOrGlob) {
        throw new Error('No watching target given. Provide path to watch.')
      }

      const watcher = new Watcher({
        includePaths: cmd.includePaths
      })
      watcher.watch(pathOrGlob)
    } else {
      pathOrGlob = pathOrGlob ?? '**/*.test.scss'

      const runner = new TestRunner({
        includePaths: cmd.includePaths
      })
      const reporter = runner.runTests(pathOrGlob)
      reporter.report()

      if (reporter.hasError()) {
        process.exit(1)
      }
    }
  })

program.parse(process.argv)
