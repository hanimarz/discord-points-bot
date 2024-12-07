const { EmbedBuilder } = require("discord.js");

module.exports = {
     name: "pointsModal",
     adminRole: true,
     owners: true,
     /**
      * @param {import('../../Client')} client
      * @param {import('discord.js').ButtonInteraction} interaction
      */
     async actionExecute(client, interaction, parts) {
          try {

               interaction.deferUpdate();

               let userID = parts[1]
               if (!userID) return interaction.editReply({ content: `Please provide a valid user`, ephemeral: true });

               const ContentValue = interaction.fields.getTextInputValue('pointsContent_modal').replace(/[^0-9]/g, '');
               const VoiceValue = interaction.fields.getTextInputValue('pointsVoice_modal').replace(/[^0-9]/g, '');

               if (isNaN(ContentValue) || isNaN(VoiceValue)) return interaction.reply({ content: `Please provide a valid number`, ephemeral: true });

               const UserData = await client.dbPoints.get(`database_${interaction.guild.id}..${userID}`);
               if (!UserData) return interaction.reply({ content: `You do not have any points`, ephemeral: true });

               if (UserData.pointsContent === ContentValue && UserData.pointsVoice === VoiceValue) return interaction.reply({ content: `You have not changed anything`, ephemeral: true });
               await client.dbPoints.set(`database_${interaction.guild.id}..${userID}`, { ...UserData, 'pointsContent': ContentValue, 'pointsVoice': VoiceValue });

               let user = interaction.guild.members.cache.get(userID);
               const embed = new EmbedBuilder()
                    .setAuthor({ name: `Manage Points`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`Points have been updated for <@${userID}>`)
                    .setColor('#161616')
                    .setTimestamp()
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })

               if (UserData?.banned) {
                    embed.addFields({ name: `Banned`, value: `${UserData.reason}`, inline: true })
               } else {
                    embed.addFields([
                         { name: `Content`, value: `${ContentValue}`, inline: true },
                         { name: `Voice`, value: `${VoiceValue}`, inline: true }
                    ])
               }

               await interaction.message.edit({ embeds: [embed] });

          } catch (err) {
               console.log(err);
          }

     }
}
