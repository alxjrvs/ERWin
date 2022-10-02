import { GuildMemberRoleManager, ModalSubmitInteraction } from 'discord.js'
import { createChannels } from './createChannels'
import { createGameRole } from './createGameRole'

export async function schedulingModal(interaction: ModalSubmitInteraction) {
  const { guild, fields, member, reply, followUp } = interaction
  if (guild == null || member == null) {
    console.error("Guid or Member not found.")

    await interaction.reply({ content: "Something went wrong - Guid or Member not found.", ephemeral: true })
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

  // Add Role to member who invoked command
  const memberRoles = member.roles as GuildMemberRoleManager
  memberRoles.add(newRole)

  // Create Channels
  await createChannels({ guild, name, newRole, everyone, address, startTime, date })

  // Send Message to Signups channel
  const channel = guild.channels.cache.get(process.env.SIGNUP_CHANNEL_ID || 'NO_SIGNUP_CHANNEL_ID')
  if (channel?.isTextBased()) {
    await channel.send(name)
  }

  // Sign off.
  await interaction.followUp({ content: "Game Scheduling complete. Good luck out there.", ephemeral: true })
}
