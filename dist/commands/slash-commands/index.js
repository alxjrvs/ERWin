"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashCommands = void 0;
const activate_1 = require("./activate");
function slashCommands(client) {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand())
            return;
        const { commandName } = interaction;
        if (commandName === 'mecatol') {
            await interaction.reply('rex');
        }
        if (commandName === 'activate') {
            (0, activate_1.activate)(interaction);
        }
    });
}
exports.slashCommands = slashCommands;
