const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Returns latency and API ping',
    run: async (client, message, args) => {
        const pingEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Ping')
            .setDescription('Calculating...')
            .setTimestamp();

        const sentMessage = await message.channel.send({ embeds: [pingEmbed] });

        const latency = sentMessage.createdTimestamp - message.createdTimestamp;
        const apiPing = Math.round(client.ws.ping);

        pingEmbed.setDescription(`Latency: ${latency}ms\nAPI Ping: ${apiPing}ms`);
        pingEmbed.setFooter(client.user.tag, client.user.displayAvatarURL());

        sentMessage.edit({ embeds: [pingEmbed] });
    },
};
