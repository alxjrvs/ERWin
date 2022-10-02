"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignupReaction = void 0;
const constants_1 = require("src/constants");
async function handleSignupReaction(origin, user, role) {
    const emoji = origin.emoji.name || '✨';
    if (!constants_1.SignupReactionEmoji.includes(emoji)) {
        origin.message.reactions.cache.get(emoji)?.remove();
        const content = [
            `**Electronic Response WINarran Automated Alert**`,
            `RE: ${origin.message.url}`,
            'IDENTIFIED INVALID RESPONSE:',
            emoji,
            '',
            'Try Harder.',
            '- ERWin'
        ].join('\n');
        user.send(content);
        return;
    }
    constants_1.SignupReactionEmoji.filter((reaction) => emoji != reaction).forEach((reaction) => {
        origin.message.reactions.cache.get(reaction)?.users.remove(user);
    });
    const member = origin.message.guild?.members.cache.get(user.id);
    if (origin.emoji.name == constants_1.ApprovalEmoji) {
        member.roles.add(role);
        const categoryChannel = origin.message.guild?.channels.cache
            .filter((channel) => channel.name == role.name)
            .first();
        const detailsChannel = categoryChannel.children.cache
            .filter((channel) => channel.name == 'details')
            .first();
        const pinnedMessages = await detailsChannel.messages.fetchPinned();
        const pinnedMessage = pinnedMessages
            .filter((message) => message.author.id == process.env.APP_ID)
            .first();
        const content = [
            `Thank you for joining the Game!`,
            `See here for more details: ${pinnedMessage.url}`
        ].join('\n');
        user.send(content);
        return;
    }
    member.roles.remove(role);
}
exports.handleSignupReaction = handleSignupReaction;
