import { GuildMemberRoleManager, ModalSubmitInteraction } from 'discord.js'
import { createChannels } from './createChannels'
import { createGameRole } from './createGameRole'

export async function schedulingModal(interaction: ModalSubmitInteraction) {
  const { guild, fields, member } = interaction
  if (guild == null || member == null) {
    // await interaction.reply({ content: 'Guild or Member not found. Shitter is full. Something broke!', ephemeral: true })
    return
  }

  await interaction.reply({ content: "Initializing...", ephemeral: true })

  const name = fields.getTextInputValue('name').replace('@', '')
  const address = fields.getTextInputValue('address')
  const startTime = fields.getTextInputValue('startTime')
  const date = fields.getTextInputValue('date')
  const everyone = guild.roles.everyone

  // Create Role
  const newRole = await createGameRole(guild, name)
  const memberRoles = member.roles as GuildMemberRoleManager
  memberRoles.add(newRole)

  // Create Channels
  await createChannels({ guild, name, newRole, everyone, address, startTime, date })

  // Format Message
  const channel = guild.channels.cache.get(process.env.ANNOUNCEMENTS_CHANNEL_ID || 'NO_ANNOUNCEMENTS_CHANNEL_ID')
  if (channel?.isTextBased()) {
    await channel.send(name)
  }
  await interaction.followUp({ content: "Game Scheduling complete. Good luck out there.", ephemeral: true })
}
