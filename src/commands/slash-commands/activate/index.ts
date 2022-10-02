import { ChatInputCommandInteraction } from 'discord.js'
import { createSchedulingModal } from '../../../structures/schedulingModal'

export async function activate(interaction: ChatInputCommandInteraction) {
  await interaction.showModal(createSchedulingModal())
}
