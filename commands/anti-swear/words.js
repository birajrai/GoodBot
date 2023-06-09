const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'words',
    run: async (client, message, args, db) => {
        let embed = new MessageEmbed()
            .setTitle(`${message.guild.name} | Anti Swear Words List`)
            .setThumbnail(message.guild.iconURL())
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setColor('GREEN');

        let words = db.get(`words_${message.guild.id}`);
        if (words && words.length) {
            let description = words.map(word => `**Word:** ${word.word} | **Added By:** ${word.author}`).join('\n');
            embed.setDescription(description);
        } else {
            embed.setDescription(':x: | **There are no words.**');
        }

        return message.channel.send({ embeds: [embed] });
    },
};
