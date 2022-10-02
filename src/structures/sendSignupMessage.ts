import { GameContext } from 'src/commands/modal-commands/schedulingModal/types'
import { ApprovalEmoji, MaybeEmoji, RejectEmoji } from 'src/constants'

export async function sendSignupMessage({
  guild,
  description,
  date,
  startTime,
  channel,
  newRole
}: GameContext) {
  const content = [
    guild.roles.everyone.toString(),
    '**THE GALAXY STIRS...**',
    '============================',
    `New Game Announcement: ${newRole.toString()} `,
    `${date.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })} @ ${startTime}`,
    description ? description.toString() : null,
    '-----------------------------------------------',
    'RSVP using the reactions below:',
    ' - ✅: Sign me up!',
    ' - ❔: Interested, but not sure if I can make it',
    " - ⛔: Can't Make It"
  ]
    .filter((line) => line != null)
    .join('\n')
  const message = await channel.send(content)
  message.react(ApprovalEmoji)
  message.react(MaybeEmoji)
  message.react(RejectEmoji)
}
