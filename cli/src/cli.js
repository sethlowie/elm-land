const { Init } = require('./commands/init')
const { Add } = require('./commands/add')
const { Server } = require('./commands/server')
const { Utils } = require('./commands/_utils')

let { version } = require('../package.json')
let intro = `🌈 Welcome to Elm Land! (v${version})`

let subcommandList = [
  'Here are the commands:',
  '✨ elm-spa init <folder-name> ...... create a new project',
  '🚀 elm-spa server ................ run a local dev server'
]

let run = (commandFromCli) => {
  // ( This function accepts a string or string[] )
  let command = typeof commandFromCli === 'string'
    ? commandFromCli.split(' ')
    : commandFromCli

  let [_npx, _elmLand, subCommand, ...args] = command

  let subcommandHandlers = {
    'init': (args) => {
      return Init.run({ name: args[0] })
    },
    'server': (args) => {
      return Server.run({})
    },
    'add': (args) => {
      return Add.run({ arguments: args })
    },
    'generate': (args) => {
      return Add.testElmCodegen()
    }
  }

  if (!subCommand) {
    return {
      message: [
        intro,
        '',
        ...subcommandList,
      ].join('\n'),
      files: [],
      effects: []
    }
  }

  let handler = subcommandHandlers[subCommand]

  if (handler) {
    return handler(args)
  } else {
    return {
      message: Utils.didNotRecognizeCommand({
        subCommand,
        subcommandList
      }),
      files: [],
      effects: []
    }
  }
}

module.exports = {
  Cli: { run }
}