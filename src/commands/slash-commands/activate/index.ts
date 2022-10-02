import { ChatInputCommandInteraction } from 'discord.js'
import { schedulingModal } from './schedulingModal'

export async function activate(interaction: ChatInputCommandInteraction) {
  await interaction.showModal(schedulingModal())
}
