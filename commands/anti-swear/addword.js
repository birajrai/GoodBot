const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'addword',
    run: async (client, message, args, db) => {
        if (!message.channel.permissionsFor(message.author).has('MANAGE_GUILD')) {
            return message.channel.send(':x: | **You dont have permissions to use this Command!**');
        }

        let pog = db.get(`words_${message.guild.id}`);
        let word = args[0];

        if (!word) {
            let embed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`:x: | **No word provided**\nFormat: \`+addword fk\``)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail(message.guild.iconURL())
                .setColor('#FF0000');

            return message.channel.send({ embeds: [embed] });
        }

        if (pog && pog.find(find => find.word === word)) {
            let embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setTitle('Error')
                .setDescription(':x: | **The word is already on the database**')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

            return message.channel.send({ embeds: [embed] });
        }

        let yes = {
            word: word,
            author: message.author.tag,
        };

        db.push(`words_${message.guild.id}`, yes);

        let embed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle('Success')
            .setThumbnail(message.guild.iconURL())
            .setDescription('**The word has been added!**')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor('RANDOM')
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
