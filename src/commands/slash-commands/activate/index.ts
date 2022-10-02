import { ChatInputCommandInteraction } from 'discord.js'
import { createSchedulingModal } from '../../../structures/createSchedulingModal'

export async function activate(interaction: ChatInputCommandInteraction) {
  await interaction.showModal(createSchedulingModal())
}
