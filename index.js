const express = require('express');
const db = require('quick.db');
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.js');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Anti Swear');
});

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.commands = new Map();
client.aliases = new Map();

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (!message.member) message.member = await message.guild.members.fetch(message.author);

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args, db);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    let words = db.get(`words_${message.guild.id}`);
    let yus = db.get(`message_${message.guild.id}`);
    if (yus === null) {
        yus = ':x: | **This word is not allowed here {user-mention}**';
    }
    if (message.content.startsWith(config.prefix + 'addword')) return;
    if (message.content.startsWith(config.prefix + 'delword')) return;
    if (message.content.startsWith(config.prefix + 'set-warn-msg')) return;
    if (message.content.startsWith(config.prefix + 'words')) return;
    let pog = yus
        .replaceAll('{user-mention}', `<@${message.author.id}>`)
        .replaceAll('{server-name}', message.guild.name)
        .replaceAll('{user-tag}', message.author.tag)
        .replaceAll('{user-username}', message.author.username);
    if (words === null) return;
    function check(msg) {
        return words.some(word => message.content.toLowerCase().replaceAll(' ', '').includes(word.word.toLowerCase()));
    }
    if (check(message.content) === true) {
        message.delete();
        message.channel.send({ content: pog });
    }
});

client.login(config.token).catch(err => {
    console.log('[ERROR]: Invalid Token Provided');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
