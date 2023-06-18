"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const rex = new discord_js_1.SlashCommandBuilder()
    .setName('mecatol')
    .setDescription('Replies with rex');
discord_js_1.SlashCommandStringOption;
const activate = new discord_js_1.SlashCommandBuilder()
    .setName('activate')
    .setDescription('Schedule and announce a new game of Twilight Imperium');
const commands = [rex, activate].map((command) => command.toJSON());
const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.TOKEN || 'NO_TOKEN');
rest
    .put(discord_js_1.Routes.applicationCommands(process.env.APP_ID || 'NO_APP_ID'), {
    body: commands
})
    .catch(console.error);
