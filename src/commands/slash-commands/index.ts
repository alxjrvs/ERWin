import { Client } from 'discord.js'
import { activate } from './activate'

export function slashCommands(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const { commandName } = interaction

    if (commandName === 'mecatol') {
      await interaction.reply('rex')
    }

    if (commandName === 'activate') {
      activate(interaction)
    }
  })
}
