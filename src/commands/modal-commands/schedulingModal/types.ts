import {
  APIInteractionGuildMember,
  Guild,
  GuildMember,
  NewsChannel,
  PrivateThreadChannel,
  PublicThreadChannel,
  Role,
  TextChannel,
  VoiceChannel
} from 'discord.js'

export interface GameContext {
  name: string
  description: string
  gameLocation: string
  everyone: Role
  newRole: Role
  guild: Guild
  date: Date
  member: GuildMember | APIInteractionGuildMember
  startTime: string
  channel:
    | NewsChannel
    | TextChannel
    | PrivateThreadChannel
    | PublicThreadChannel
    | VoiceChannel
}
