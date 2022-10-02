import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'

config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
  console.log('Ready!')
})

// Slash Commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction

  if (commandName === 'mecatol') {
    await interaction.reply('rex')
  }
  if (commandName === 'activate') {
    const options = {
      host: interaction.options.getUser('host'),
      name: interaction.options.getString('name'),
      date: interaction.options.getString('date'),
      startTime: interaction.options.getString('start_time'),
      endTime: interaction.options.getString('end_time'),
      title: interaction.options.getString('title'),
      subtitle: interaction.options.getString('subtitle'),
      description: interaction.options.getString('description'),
    }
    const content = [
      `${options.title}` || `NEW GAME ANNOUNCEMENT`,
      `${options.date}`,
      `${options.startTime}-${options.endTime}`,
      `${options.subtitle}`,
      `-----------------------`,
      `Host: ${options.host}`,
      `Role: @${options.name}`,
      `-----------------------`,
      `${options.description}` || '',
    ].join('\n')

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('confirm')
          .setLabel('Cry Havoc')
          .setStyle(ButtonStyle.Primary),
      )
    await interaction.reply({ content, components: [row], ephemeral: true })
  }
})

client.login(process.env.TOKEN)
