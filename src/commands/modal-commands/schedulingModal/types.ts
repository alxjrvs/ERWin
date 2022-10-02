import { Guild, NewsChannel, PrivateThreadChannel, PublicThreadChannel, Role, TextChannel, VoiceChannel } from 'discord.js'

export interface GameContext {
  name: string
  address: string
  everyone: Role
  newRole: Role
  guild: Guild
  date: string
  startTime: string
  channel: NewsChannel | TextChannel | PrivateThreadChannel | PublicThreadChannel | VoiceChannel
}
