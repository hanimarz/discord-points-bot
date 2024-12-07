const { EmbedBuilder } = require('discord.js');

module.exports = {
     name: "view-auto-role",
     description: `View the auto role for new members`,
     adminRole: true,
     owners: true,
     /**
      * @param {import('discord.js').Client} client
      * @param {import('discord.js').Interaction} interaction
      * @param {String[]} args
      * @returns
      */
     async execute(client, interaction) {
          try {


               let getAutoRole = await client.dbPoints.get(`database_${interaction.guild.id}..settings..autoRole`);
               if (!getAutoRole) return interaction.reply({ content: `No auto role set`, ephemeral: true });

               let autoRole = [];

               for (const [key, value] of Object.entries(getAutoRole)) {
                    let role = interaction.guild.roles.cache.get(value[0]);
                    autoRole.push(`Level ${key} - <@&${role.id}>`) || "No role set";
               }

               let embed = new EmbedBuilder()
                    .setTitle(`Auto Role`)
                    .setDescription(autoRole.join('\n'))
                    .setColor(`#161616`);

               return interaction.reply({ embeds: [embed], ephemeral: true });

          } catch (err) {
               console.log(err)
          }
     },
};