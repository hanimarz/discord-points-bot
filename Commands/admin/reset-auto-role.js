module.exports = {
     name: "reset-auto-role",
     description: `clear all auto-role configurations.`,
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

               let getAutoRole = await client.dbPoints.get(`database_${message.guild.id}..settings..autoRole`);
               if (!getAutoRole) return message.reply({ content: `There is no auto role` });

               await client.dbPoints.delete(`database_${message.guild.id}..settings..autoRole`);
               message.reply({ content: `Successfully reset auto role` });

          } catch (err) {
               console.log(err)
          }
     },
};
