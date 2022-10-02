import { Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'
import { slashCommands } from './commands/slash-commands'
import { SchedulerModalId } from './commands/slash-commands/activate'

config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', interaction => {
  if (!interaction.isModalSubmit()) return

  const { customId } = interaction

  if (customId == SchedulerModalId) {
    interaction.reply('Foo')
  }

})

// Slash Commands
slashCommands(client)

client.login(process.env.TOKEN)
