const fs = require('fs');
const ascii = require( 'ascii-table');
let table = new ascii(`Commands`);
table.setHeading('Command', 'Load Status');

module.exports = (client) => {
    try {
        let commandArray = [];
        fs.readdirSync('./Commands').forEach(async (folder) => {
            const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                let command = require(`../Commands/${folder}/${file}`);
                if (command.name) {
                    client.commands.set(command.name, command);
                    table.addRow(file, '✅');
                } else {
                    table.addRow(file, '❌');
                    continue;
                }
            }
        });
        console.log(table.toString());
    } catch (err) {
        console.log(err)
    }
}