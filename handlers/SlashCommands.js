const fs = require('fs');
const ascii = require('ascii-table');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require("../config.json");

let table = new ascii(`SlashCommands`);
table.setHeading('Commands', 'Load Status');

module.exports = (client) => {
    if (!client.slashCommands) {
        client.slashCommands = new Map();
    }

    fs.readdirSync('./SlashCommands').forEach((folder) => {
        const commandFiles = fs.readdirSync(`./SlashCommands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../SlashCommands/${folder}/${file}`);
            if (command.name) {
                client.slashCommands.set(command.name, command);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌');
            }
        }
    });

    const clientId = config.clientId || process.env.clientId;
    const token = config.token || process.env.token;

    if (!clientId) {
        console.log("log: clientId is missing. Please check your config.json or environment variables.");
        return;
    }

    if (!token) {
        console.log("log: token is missing. Please check your config.json or environment variables.");
        return;
    }

    const commands = client.slashCommands.map(({ execute, ...data }) => data);

    const rest = new REST({ version: '10' }).setToken(token);
    rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
    )
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.log);

    console.log(table.toString());
    console.log(`Successfully reloaded ${commands.length} slash commands!`);
};
