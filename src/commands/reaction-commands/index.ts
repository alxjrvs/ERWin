import { Client } from 'discord.js'
import { ApprovalEmoji, MaybeEmoji, RejectEmoji } from 'src/constants'

export async function reactionCommands(client: Client) {
  client.on('messageReactionAdd', async (origin, user) => {
    if (origin.partial) {
      try {
        await origin.fetch()
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error)
        return
      }
    }

    const isSignupChannel = origin.message.channel.id == process.env.SIGNUP_CHANNEL_ID
    const isBotMessage = origin.message.author?.id == process.env.APP_ID
    const isBotReaction = origin.message.author?.id == user.id
    const role = origin.message.mentions.roles.first()
    const valid =
      isSignupChannel &&
      isBotMessage &&
      role &&
      !isBotReaction

    if (valid) {
      switch (origin.emoji.name) {
        case ApprovalEmoji:
          console.log('Yes')
          console.log(role.name)
          break
        case MaybeEmoji:
          console.log('maybe')
          console.log(role.name)
          break
        case RejectEmoji:
          console.log('No')
          console.log(role.name)
          break
        default:
          console.log('default')
          console.log(role.name)
      }
    }
  })
}
