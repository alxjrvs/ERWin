import { ChannelType, OverwriteType, PermissionsBitField } from 'discord.js'
import { GameContext } from './types'

export async function createChannels({
  guild,
  date,
  startTime,
  newRole,
  everyone,
  name,
  address
}: GameContext) {
  const category = await guild.channels.create({
    name,
    type: ChannelType.GuildCategory,
    position: 3,
    permissionOverwrites: [
      {
        type: OverwriteType.Role,
        id: newRole?.id || 'NO-ROLE',
        allow: [
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.SendMessages
        ]
      },
      {
        type: OverwriteType.Role,
        id: everyone?.id || 'NO-ROLE',
        deny: [PermissionsBitField.Flags.ViewChannel]
      }
    ]
  })

  const details = await guild.channels.create({
    name: 'details',
    type: ChannelType.GuildText,
    position: 1,
    parent: category.id,
    permissionOverwrites: [
      {
        type: OverwriteType.Role,
        id: newRole?.id || 'NO-ROLE',
        deny: [PermissionsBitField.Flags.SendMessages]
      }
    ]
  })

  await guild.channels.create({
    name: 'general',
    type: ChannelType.GuildText,
    position: 2,
    topic: 'Get to know one another - before the bloodshed.',
    parent: category.id
  })

  await guild.channels.create({
    name: 'faction-selection',
    type: ChannelType.GuildText,
    position: 3,
    topic: 'Discuss what factions are worthy of your glory',
    parent: category.id
  })

  await guild.channels.create({
    name: 'game-logistics',
    type: ChannelType.GuildText,
    position: 4,
    topic: 'Hash out the nitty-gritty',
    parent: category.id
  })

  await guild.channels.create({
    name: 'questions',
    type: ChannelType.GuildText,
    position: 5,
    topic:
      'Confused about the rules? Got something you need to know? Ask away!',
    parent: category.id
  })

  // Send a follow-up message with Address
  const message = [
    `Game Details:`,
    `Host: <Host>`,
    `Where: ${address}`,
    `When: ${date} @ ${startTime}`
  ].join('\n')

  details.send(message).then((msg) => msg.pin())
}
