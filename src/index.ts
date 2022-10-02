import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { config } from 'dotenv'
import { modalCommands } from './commands/modal-commands'
import { reactionCommands } from './commands/reaction-commands'
import { slashCommands } from './commands/slash-commands'

config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
})

client.once('ready', () => {
  console.log('Ready!')
})

slashCommands(client)
modalCommands(client)
reactionCommands(client)

client.login(process.env.TOKEN)
