const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Anti Swear')
})

app.listen(port, () => {
  console.log(``)
})
console.log("[INFO]: Loading...")

const { Client, Collection } = require("discord.js");
const { prefix, token } = require("./config.json")
const client = new Client({
  disableMentions: "everyone"
})
const db = require("quick.db")
client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {


  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command)
    command.run(client, message, args, db);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  let words = db.get(`words_${message.guild.id}`)
  let yus = db.get(`message_${message.guild.id}`)
  if (yus === null) {
    yus = ":x: | **This word is not allowed here {user-mention}**"
  }
  if (message.content.startsWith(prefix + "addword")) return;
  if (message.content.startsWith(prefix + "delword")) return;
  if (message.content.startsWith(prefix + "set-warn-msg")) return;
  if (message.content.startsWith(prefix + "words")) return;
  let pog = yus.split("{user-mention}").join("<@" + message.author.id + ">").split("{server-name}").join(message.guild.name).split("{user-tag}").join(message.author.tag).split("{user-username}").join(message.author.username)
  if (words === null) return;
  function check(msg) {
    return words.some(word => message.content.toLowerCase().split(" ").join("").includes(word.word.toLowerCase()))
  }
  if (check(message.content) === true) {
    message.delete()
    message.channel.send(pog)
  }
})

client.login(token).catch(err => {
  console.log("[ERROR]: Invalid Token Provided")
})
