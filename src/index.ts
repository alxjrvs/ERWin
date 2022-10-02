import { Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'
import { modalCommands } from './commands/modal-commands'
import { slashCommands } from './commands/slash-commands'

config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
  console.log('Ready!')
})

// Slash Commands
slashCommands(client)

//Modal commands
modalCommands(client)

client.login(process.env.TOKEN)
