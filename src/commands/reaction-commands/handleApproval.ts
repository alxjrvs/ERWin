import {
  MessageReaction,
  PartialMessageReaction,
  CategoryChannel,
  TextChannel,
  Message,
  GuildMember,
  Role
} from 'discord.js'

export async function handleApproval(
  origin: MessageReaction | PartialMessageReaction,
  member: GuildMember,
  role: Role
) {
  member.roles.add(role)
  const categoryChannel = origin.message.guild?.channels.cache
    .filter((channel) => channel.name == role.name)
    .first() as CategoryChannel
  const detailsChannel = categoryChannel.children.cache
    .filter((channel) => channel.name == 'details')
    .first() as TextChannel
  const pinnedMessages = await detailsChannel.messages.fetchPinned()
  const pinnedMessage = pinnedMessages
    .filter((message) => message.author.id == process.env.APP_ID)
    .first() as Message

  const content = [
    `Thank you for joining the Game!`,
    `See here for more details: ${pinnedMessage.url}`
  ].join('\n')
  member.send(content)
}
