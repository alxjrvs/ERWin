import {
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User
} from 'discord.js'

export function handleBadReaction(
  origin: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
  emoji: string
) {
  origin.message.reactions.cache.get(emoji)?.remove()
  const content = [
    `**Electronic Response WINarran Automated Alert**`,
    `RE: ${origin.message.url}`,
    'IDENTIFIED INVALID RESPONSE:',
    emoji,
    '',
    'Try Harder.',
    '- ERWin'
  ].join('\n')
  user.send(content)
}
