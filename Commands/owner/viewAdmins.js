const { EmbedBuilder } = require("discord.js");

module.exports = {
     name: "view-admins",
     description: `View all admins added to the bot`,
     owners: true,
     /**
      * @param {import('discord.js').Client} client
      * @param {import('discord.js').Interaction} interaction
      * @param {String[]} args
      * @returns
      */
     async execute(client, interaction) {
          try {

               let settingsData = await client.dbPoints.get(`database_${interaction.guild.id}..settings`);

               if (!settingsData) {
                    settingsData = {
                         roles: "No roles added yet.",
                         admins: "No admins added yet."
                    }
               }

               let getRoles = settingsData.roles || [];
               let getAdmins = settingsData.admins || [];

               for (let i = 0; i < getRoles.length; i++) {
                    getRoles[i] = interaction.guild.roles.cache.get(getRoles[i]);
                    if (!getRoles[i]) {
                         await client.dbPoints.pull(`database_${interaction.guild.id}..settings..roles`, getRoles[i].id);
                    }
               }

               for (let i = 0; i < getAdmins.length; i++) {
                    getAdmins[i] = interaction.guild.members.cache.get(getAdmins[i]);
                    if (!getAdmins[i]) {
                         await client.dbPoints.pull(`database_${interaction.guild.id}..settings..admins`, getAdmins[i].id);
                    }
               }

               let embed = new EmbedBuilder()
                    .setTitle("Admins and Roles")
                    .setDescription("View all admins and roles added to the bot")
                    .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.author.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor("#161616");

               if (getRoles?.length === 0) {
                    embed.addFields({ name: "Roles", value: "No roles added yet.", inline: false });
               } else {
                    embed.addFields({ name: "Roles", value: getRoles.join("\n"), inline: false });
               }

               if (getAdmins?.length === 0) {
                    embed.addFields({ name: "Admins", value: "No admins added yet.", inline: false });
               } else {
                    embed.addFields({ name: "Admins", value: getAdmins.join("\n"), inline: false });
               }

               return interaction.reply({ embeds: [embed], ephemeral: true });

          } catch (err) {
               console.log(err)
          }
     },
};