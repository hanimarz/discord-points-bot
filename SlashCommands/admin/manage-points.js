const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
     name: "manage-points",
     description: `manage points of a user`,
     adminRole: true,
     owners: true,
     options: [
          {
               name: "user",
               description: "User to manage points",
               type: 6,
               required: true,
          },
     ],
     /**
      * @param {import('discord.js').Client} client
      * @param {import('discord.js').Interaction} interaction
      * @param {String[]} args
      * @returns
      */
     async execute(client, interaction) {
          try {

               let userID = interaction.options.getUser('user');
               if (!userID || userID.bot) return interaction.reply({ content: `Please provide a valid user` });
               if (userID.id === interaction.user.id) return interaction.reply({ content: `You cannot ban yourself` });

               const UserData = await client.dbPoints.get(`database_${interaction.guild.id}..${userID.id}`);
               if (!UserData) return interaction.reply({ content: `This user does not have any points` });

               const embed = new EmbedBuilder()
                    .setAuthor({ name: `Manage Points`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`Manage points for <@${userID.id}>`)
                    .setColor('#161616')
                    .setTimestamp()
                    .setThumbnail(userID.displayAvatarURL({ dynamic: true }))
                    .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })

               if (UserData?.banned) {
                    embed.addFields({ name: `Banned`, value: `${UserData.reason}`, inline: true })
               } else {
                    embed.addFields([
                         { name: `Content`, value: `${UserData.pointsContent}`, inline: true },
                         { name: `Voice`, value: `${UserData.pointsVoice}`, inline: true }
                    ])
               }

               const manage_Points = new ButtonBuilder()
                    .setCustomId(`manage_Points_${userID.id}`)
                    .setLabel("Manage Points")
                    .setStyle(ButtonStyle.Secondary);

               const delete_Points = new ButtonBuilder()
                    .setCustomId(`delete_Points_${userID.id}`)
                    .setLabel("Delete Points")
                    .setStyle(ButtonStyle.Secondary);

               let ban_Points = new ButtonBuilder()
                    .setCustomId(`ban_Points_${userID.id}`)

               if (UserData?.banned) {
                    ban_Points.setLabel("Unban Points")
                    ban_Points.setStyle(ButtonStyle.Success);
               } else {
                    ban_Points.setLabel("Ban Points")
                    ban_Points.setStyle(ButtonStyle.Danger);
               }

               const row = new ActionRowBuilder().addComponents(manage_Points, delete_Points, ban_Points);
               return interaction.reply({ embeds: [embed], components: [row] });

          } catch (err) {
               console.log(err)
          }
     },
};