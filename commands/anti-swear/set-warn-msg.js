const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'set-warn-msg',
    run: async (client, message, args, db) => {
        if (!message.channel.permissionsFor(message.author).has('MANAGE_GUILD')) {
            return message.channel.send(':x: | **You dont have permissions to use this Command!**');
        }

        let msg = args.join(' ');

        if (!msg) {
            return message.channel.send('Provide a message.');
        }

        db.set(`message_${message.guild.id}`, msg);

        let embed = new MessageEmbed()
            .setTitle('Message Set!')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addFields(
                { name: 'message', value: msg },
                {
                    name: 'preview',
                    value: msg
                        .split('{user-mention}')
                        .join(`<@${message.author.id}>`)
                        .split('{server-name}')
                        .join(message.guild.name)
                        .split('{user-tag}')
                        .join(message.author.tag)
                        .split('{user-username}')
                        .join(message.author.username),
                }
            )
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor('GREEN');

        return message.channel.send({ embeds: [embed] });
    },
};
