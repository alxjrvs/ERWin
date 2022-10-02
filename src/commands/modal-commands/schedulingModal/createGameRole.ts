import { GameContext } from './types'

export async function createGameRole({
  guild,
  name
}: Omit<GameContext, 'newRole'>) {
  return guild.roles.create({
    name,
    mentionable: true
  })
}
