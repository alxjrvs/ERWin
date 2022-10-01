import { Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'

config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction

  if (commandName === 'mecatol') {
    await interaction.reply('rex')
  }
})

client.login(process.env.TOKEN)
