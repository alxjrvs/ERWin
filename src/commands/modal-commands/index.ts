import { Client } from 'discord.js'
import { SchedulingModalId } from '../../structures/schedulingModal'
import { schedulingModal } from './schedulingModal'

export async function modalCommands(client: Client) {
  client.on('interactionCreate', (interaction) => {
    if (!interaction.isModalSubmit()) return

    const { customId } = interaction

    if (customId == SchedulingModalId) {
      schedulingModal(interaction)
    }
  })
}
