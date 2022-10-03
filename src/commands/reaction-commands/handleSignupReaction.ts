import {
  GuildMember,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  Role,
  User
} from 'discord.js'
import { ApprovalEmoji, SignupReactionEmoji } from '../../constants'
import { handleApproval } from './handleApproval'
import { handleBadReaction } from './sendBadReaction'

export async function handleSignupReaction(
  origin: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
  role: Role
) {
  const emoji = origin.emoji.name || '✨'
  if (!SignupReactionEmoji.includes(emoji)) {
    handleBadReaction(origin, user, emoji)
    return
  }

  // Remove Other Reactions
  SignupReactionEmoji.filter((reaction) => emoji != reaction).forEach(
    (reaction) => {
      origin.message.reactions.cache.get(reaction)?.users.remove(user as User)
    }
  )

  const member = origin.message.guild?.members.cache.get(user.id) as GuildMember

  if (origin.emoji.name == ApprovalEmoji) {
    handleApproval(origin, member, role)
    return
  }
  member.roles.remove(role)
}
