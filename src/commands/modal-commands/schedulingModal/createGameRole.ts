import { Guild } from 'discord.js'

export async function createGameRole(guild: Guild, name: string) {
  return guild.roles.create({
    name,
    mentionable: true
  })
}
