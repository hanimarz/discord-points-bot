module.exports = {
     name: "channel-level",
     description: `Setup the channel for level up messages`,
     aliases: [],
     adminRole: true,
     owners: true,
     /**
      * @param {import('discord.js').Client} client
      * @param {import('discord.js').Message} message
      * @param {String[]} args
      * @returns
      */
     async execute(client, message, args) {
          try {
               let channel = message.mentions.channels.first() || message.channel;
               await client.dbPoints.set(`database_${message.guild.id}..settings..levelChannel`, channel.id);
               return message.reply({ content: `Level up messages will be sent in <#${channel.id}> !` });
          } catch (err) {
               console.log(err)
          }
     },
};