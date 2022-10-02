import { REST, SlashCommandBuilder, Routes, SlashCommandStringOption } from 'discord.js'
import { config } from 'dotenv'
config()

const rex = new SlashCommandBuilder()
  .setName('mecatol')
  .setDescription('Replies with rex')
SlashCommandStringOption
const activate = new SlashCommandBuilder()
  .setName('activate')
  .setDescription('Schedule and announce a new game of Twilight Imperium')
  .addUserOption(option =>
    option.setName('host')
      .setDescription('The @handle of the Host of the event')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('name')
      .setDescription('Name of this game (Will become Channel and @Role)')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('date')
      .setDescription('The Date of the event (MM/DD/YY)')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('start_time')
      .setDescription('Suggested start time (HH:MM AM/PM')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('end_time')
      .setDescription('Suggested end time (HH:MM AM/PM')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('title')
      .setDescription('Catchy Title'))
  .addStringOption(option =>
    option.setName('subtitle')
      .setDescription('Catchy SubTitle'))
  .addStringOption(option =>
    option.setName('description')
      .setDescription('Catchy Description'))


const commands = [
  rex,
  activate,
]
  .map(command => command.toJSON())

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN || 'NO_TOKEN')

rest.put(Routes.applicationGuildCommands(process.env.APP_ID || 'NO_APP_ID', process.env.GUILD_ID || 'NO_GUILD'), { body: commands })
  .catch(console.error)
