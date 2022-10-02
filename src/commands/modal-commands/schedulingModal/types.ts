import { Guild, NewsChannel, PrivateThreadChannel, PublicThreadChannel, Role, TextChannel, VoiceChannel } from 'discord.js'

export interface GameContext {
  name: string
  description: string
  gameLocation: string
  everyone: Role
  newRole: Role
  guild: Guild
  date: Date,
  startTime: string
  channel: NewsChannel | TextChannel | PrivateThreadChannel | PublicThreadChannel | VoiceChannel
}
