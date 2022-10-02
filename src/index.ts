import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { config } from 'dotenv'
import { modalCommands } from './commands/modal-commands'
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

// client.on('messageReactionAdd', async (reaction_orig, user) => {
//   console.log('Reaction Received')
// })
client.login(process.env.TOKEN)
