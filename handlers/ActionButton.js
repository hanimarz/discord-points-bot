const fs = require('fs');

/**
 * @param {import('./../Client')} client 
 */
module.exports = (client) => {
  console.log('Loading button');
  fs.readdirSync('./ButtonAction')
    // .filter(file => file.endsWith('.js'))
    .forEach(file => {
      // Check if the command is Dir
      if (fs.lstatSync(`./ButtonAction/${file}`).isDirectory()) {
        fs.readdirSync(`./ButtonAction/${file}`)
          .filter(f => f.endsWith('.js'))
          .forEach(f => {
            const command = require(`../ButtonAction/${file}/${f}`);
            client.btnAction.set(command.name, command);
          });
      } else {
        if (!file.endsWith('.js')) return;
        const command = require(`../ButtonAction/${file}`);
        client.btnAction.set(command.name, command);
      };
    });

};
