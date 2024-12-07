const { prefix, adminRole, owners } = require('../../config.json');
const { Collection } = require('discord.js');
const delay = new Collection();
const ms = require('ms');

module.exports = {
  name: 'messageCreate',
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   * @returns
   */
  async execute(client, message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    try {
      let commandFiles = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
      if (!commandFiles) return;
      if (commandFiles) {
        let ServerData = await await client.dbPoints.get(`database_${message.guild.id}..settings`);
        let role = ServerData?.adminRole || [];
        let admins = ServerData?.admins || [];

        if (commandFiles.adminRole && !message.member.roles.cache.some(role => adminRole.includes(role.id)) && !owners.includes(message.author.id) && !message.member.roles.cache.some(r => role.includes(r.id)) && !admins.includes(message.author.id)) return message.channel.send(`:x: **You don't have permission to use this command**`);
        if (command.owners && !owners.includes(message.author.id)) return interaction.reply(`:x: **You don't have permission to use this command**`);
        if (commandFiles.cooldown) {
          if (delay.has(`${commandFiles.name}-${message.author.id}`)) return message.reply(`You can use this command again after **${ms(delay.get(`${commandFiles.name}-${message.author.id}`) - Date.now(), { long: true }).includes('ms') ? '0 second' : ms(delay.get(`${commandFiles.name}-${message.author.id}`) - Date.now(), { long: true })}**`);
          commandFiles.execute(client, message, args);
          delay.set(`${commandFiles.name}-${message.author.id}`, Date.now() + commandFiles.cooldown);
          setTimeout(() => {
            delay.delete(`${commandFiles.name}-${message.author.id}`);
          }, commandFiles.cooldown);
        } else {
          commandFiles.execute(client, message, args);
        }
      }
    } catch (error) {
      console.log(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}