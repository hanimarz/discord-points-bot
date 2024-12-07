const { EmbedBuilder } = require('discord.js');

module.exports = {
     name: "view-auto-role",
     description: `View the auto role for new members`,
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
               if (!getAutoRole) return message.reply({ content: `No auto role set` });

               let autoRole = [];

               for (const [key, value] of Object.entries(getAutoRole)) {
                    let role = message.guild.roles.cache.get(value[0]);
                    autoRole.push(`Level ${key} - <@&${role.id}>`) || "No role set";
               }

               let embed = new EmbedBuilder()
                    .setTitle(`Auto Role`)
                    .setDescription(autoRole.join('\n'))
                    .setColor(`#161616`);

               return message.reply({ embeds: [embed] });

          } catch (err) {
               console.log(err)
          }
     },
};