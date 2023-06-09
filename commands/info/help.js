const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle('Help | ' + client.user.username)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp()
            .setDescription('The commands are listed below:')
            .addFields(
                { name: 'anti-swear', value: '`addword` | `delword` | `set-warn-msg` | `words`' },
                { name: 'info', value: '`help` | `ping`' }
            )
            .setColor('GREEN');

        message.channel.send({ embeds: [embed] });
    },
};
