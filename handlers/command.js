const { readdirSync } = require('fs');
const path = require('path');

module.exports = client => {
    const commandFiles = readdirSync(path.join(__dirname, '..', 'commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(__dirname, '..', 'commands', file));

        if (command.name) {
            client.commands.set(command.name, command);
        }

        if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach(alias => {
                client.aliases.set(alias, command.name);
            });
        }
    }

    console.log('[INFO]: Commands Loaded!');
};
