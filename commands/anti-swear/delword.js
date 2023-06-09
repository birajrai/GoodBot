const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'delword',
    run: async (client, message, args, db) => {
        if (!message.channel.permissionsFor(message.author).has('MANAGE_GUILD')) {
            return message.channel.send(':x: | **You dont have permissions to use this Command!**');
        }

        let pog = db.get(`words_${message.guild.id}`);
        let word = args[0];

        if (!word) {
            let embed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`:x: | **No word provided**\nFormat: \`+delword fk\``)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail(message.guild.iconURL())
                .setColor('#FF0000');

            return message.channel.send({ embeds: [embed] });
        }

        if (pog) {
            let data = pog.find(x => x.word.toLowerCase() === word.toLowerCase());

            let No = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(':x: | **Word Not Found**')
                .setColor('#FF0000')
                .setFooter(message.guild.name, message.guild.iconURL())
                .setThumbnail(message.guild.iconURL());

            if (!data) return message.channel.send({ embeds: [No] });

            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter(x => {
                return x != null && x != '';
            });

            db.set(`words_${message.guild.id}`, filter);

            let embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('**The word has been deleted!**')
                .setFooter(message.guild.name, message.guild.iconURL())
                .setColor('GREEN')
                .setTimestamp();

            return message.channel.send({ embeds: [embed] });
        } else {
            let embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(':x: | **The word was not found!**')
                .setFooter(message.guild.name, message.guild.iconURL())
                .setColor('#FF0000')
                .setTimestamp();

            return message.channel.send({ embeds: [embed] });
        }
    },
};
