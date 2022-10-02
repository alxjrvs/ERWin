import { GuildMemberRoleManager, ModalSubmitInteraction } from 'discord.js'
import { formatDate } from './formatDate'
import { sendSignupMessage } from './sendSignupMessage'
import { createChannels } from './createChannels'
import { createGameRole } from './createGameRole'

export async function schedulingModal(interaction: ModalSubmitInteraction) {
  const { guild, fields, member } = interaction
  if (guild == null || member == null) {
    console.error('Guid or Member not found.')

    await interaction.reply({
      content:
        "It looks like ERWIN can't find the Guild or Member for this server.",
      ephemeral: true
    })
    return
  }

  const channel = guild.channels.cache.get(
    process.env.SIGNUP_CHANNEL_ID || 'NO_SIGNUP_CHANNEL_ID'
  )
  if (!channel?.isTextBased()) {
    console.error('Game Signup channel not found, or is not text based.')
    await interaction.reply({
      content: "It looks like ERWin can't find the Signup channel.",
      ephemeral: true
    })
    return
  }

  await interaction.reply({ content: 'Initializing...', ephemeral: true })

  const rolelessGameContext = {
    guild,
    channel,
    member,
    name: fields.getTextInputValue('name').replace('@', ''),
    description: fields.getTextInputValue('description'),
    gameLocation: fields.getTextInputValue('gameLocation'),
    startTime: fields.getTextInputValue('startTime'),
    date: formatDate(fields.getTextInputValue('date')),
    everyone: guild.roles.everyone
  }

  const dateFormattedCorrectly =
    rolelessGameContext.date.toString() != 'Invalid Date'
  const dateIsInFuture = rolelessGameContext.date > new Date()
  const dateValid = dateFormattedCorrectly && dateIsInFuture

  if (!dateValid) {
    await interaction.followUp({
      content: `\`${fields.getTextInputValue(
        'date'
      )}\` is not a valid date. Be sure to use DD/MM/YY, and be sure the date is in the future.`,
      ephemeral: true
    })
    return
  }

  // Create Role
  const newRole = await createGameRole(rolelessGameContext)

  const gameContext = {
    ...rolelessGameContext,
    newRole
  }

  // Add Role to member who invoked command
  const memberRoles = member.roles as GuildMemberRoleManager
  memberRoles.add(newRole)

  // Create Channels
  await createChannels(gameContext)

  // Send Message to Signups channel
  await sendSignupMessage(gameContext)
}
