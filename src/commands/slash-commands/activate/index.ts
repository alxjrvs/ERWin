import { ChatInputCommandInteraction } from 'discord.js'
import { schedulingModal } from 'src/structures/schedulingModal'

export async function activate(interaction: ChatInputCommandInteraction) {
  await interaction.showModal(schedulingModal())
}
