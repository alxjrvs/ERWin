import { CategoryChannel, GuildMember, Message, MessageReaction, PartialMessageReaction, PartialUser, Role, TextChannel, User } from 'discord.js'
import { ApprovalEmoji, SignupReactionEmoji } from 'src/constants'

export async function handleSignupReaction(origin: MessageReaction | PartialMessageReaction, user: User | PartialUser, role: Role) {
  const emoji = origin.emoji.name || '✨'
  if (!SignupReactionEmoji.includes(emoji)) {
    origin.message.reactions.cache.get(emoji)?.remove()
    const content = [
      `**Electronic Response WINarran Automated Alert**`,
      `RE: ${origin.message.url}`,
      "IDENTIFIED INVALID RESPONSE:",
      emoji,
      '',
      'Try Harder.',
      '- ERWin'
    ].join('\n')
    user.send(content)
    return
  }

  // Remove Other Reactions
  SignupReactionEmoji.filter(reaction => emoji != reaction).forEach(reaction => {
    origin.message.reactions.cache.get(reaction)?.users.remove(user as User)
  })

  const member = origin.message.guild?.members.cache.get(user.id) as GuildMember

  if (origin.emoji.name == ApprovalEmoji) {
    member.roles.add(role)
    const categoryChannel = origin.message.guild?.channels.cache.filter(channel => channel.name == role.name).first() as CategoryChannel
    const detailsChannel = categoryChannel.children.cache.filter(channel => channel.name == 'details').first() as TextChannel
    const pinnedMessages = await detailsChannel.messages.fetchPinned()
    const pinnedMessage = pinnedMessages.filter(message => message.author.id == process.env.APP_ID).first() as Message

    const content = [
      `Thank you for joining the Game!`,
      `See here for more details: ${pinnedMessage.url}`
    ].join("\n")
    user.send(content)
    return
  }
  member.roles.remove(role)
}
