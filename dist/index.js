"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const modal_commands_1 = require("./commands/modal-commands");
const reaction_commands_1 = require("./commands/reaction-commands");
const slash_commands_1 = require("./commands/slash-commands");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions
    ],
    partials: [discord_js_1.Partials.Channel, discord_js_1.Partials.Message, discord_js_1.Partials.Reaction]
});
client.once('ready', () => {
    console.log('Ready!');
});
(0, slash_commands_1.slashCommands)(client);
(0, modal_commands_1.modalCommands)(client);
(0, reaction_commands_1.reactionCommands)(client);
client.login(process.env.TOKEN);
