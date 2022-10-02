import {
  REST,
  SlashCommandBuilder,
  Routes,
  SlashCommandStringOption
} from 'discord.js'
import { config } from 'dotenv'
config()

const rex = new SlashCommandBuilder()
  .setName('mecatol')
  .setDescription('Replies with rex')
SlashCommandStringOption
const activate = new SlashCommandBuilder()
  .setName('activate')
  .setDescription('Schedule and announce a new game of Twilight Imperium')

const commands = [rex, activate].map((command) => command.toJSON())

const rest = new REST({ version: '10' }).setToken(
  process.env.TOKEN || 'NO_TOKEN'
)

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.APP_ID || 'NO_APP_ID',
      process.env.GUILD_ID || 'NO_GUILD'
    ),
    { body: commands }
  )
  .catch(console.error)
