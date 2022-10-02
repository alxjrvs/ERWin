import { Guild, Role } from 'discord.js'

export interface ModalInputs {
  name: string
  address: string
  everyone: Role
  newRole: Role
  guild: Guild
  date: string
  startTime: string
}
