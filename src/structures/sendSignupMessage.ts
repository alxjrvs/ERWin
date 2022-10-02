import { GameContext } from 'src/commands/modal-commands/schedulingModal/types'

export async function sendSignupMessage({ channel }: GameContext) {
  await channel.send("foo")
}
