import { ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalActionRowComponentBuilder } from 'discord.js'

export const SchedulerModalId = 'gameScheduler'

function modal() {
  const modal = new ModalBuilder()
    .setCustomId(SchedulerModalId)
    .setTitle('Schedule Game')

  const inputs = [
    new TextInputBuilder()
      .setCustomId('nameInput')
      .setLabel("What is the Short name (role)")
      .setPlaceholder("Oct2022")
      .setStyle(TextInputStyle.Short)
      .setRequired(true),
    new TextInputBuilder()
      .setCustomId('dateInput')
      .setLabel("What Date is the game?")
      .setPlaceholder("MM/DD/YY")
      .setStyle(TextInputStyle.Short)
      .setRequired(true),
    new TextInputBuilder()
      .setCustomId('startTimeInput')
      .setLabel("Start time?")
      .setPlaceholder("HH:MM AM")
      .setStyle(TextInputStyle.Short)
      .setRequired(true),
    new TextInputBuilder()
      .setCustomId('endTimeInput')
      .setLabel("End time?")
      .setPlaceholder("HH:MM PM")
      .setStyle(TextInputStyle.Short)
      .setRequired(true),
    new TextInputBuilder()
      .setCustomId('descriptionInput')
      .setLabel("Any Special description?")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false),
  ]
  const components = inputs.map(input => new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(input))
  modal.addComponents(components)
  return modal
}

export async function activate(interaction: ChatInputCommandInteraction) {
  await interaction.showModal(modal())
}
