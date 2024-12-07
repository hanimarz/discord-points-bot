const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
     name: "manage_Points",
     adminRole: true,
     owners: true,
     /**
      * @param {import('../../Client')} client
      * @param {import('discord.js').ButtonInteraction} interaction
      */
     async actionExecute(client, interaction, parts) {
          try {

               let userID = parts[2];
               const UserData = await client.dbPoints.get(`database_${interaction.guild.id}..${userID}`);
               if (!UserData) return interaction.reply({ content: `You do not have any points`, ephemeral: true });

               const modal = new ModalBuilder()
                    .setCustomId(`pointsModal_${userID}`)
                    .setTitle('Remove Points');

               let ContentLength = UserData.pointsContent || "0";
               let VoiceLength = UserData.pointsVoice || "0";

               const pointsContent = new TextInputBuilder()
                    .setCustomId('pointsContent_modal')
                    .setLabel("Points message")
                    .setRequired(true)
                    .setPlaceholder("enter the reason")
                    .setValue(`${ContentLength}`)
                    .setMinLength(1)
                    .setStyle(TextInputStyle.Short);

               const pointsVoice = new TextInputBuilder()
                    .setCustomId('pointsVoice_modal')
                    .setLabel("Points Voice")
                    .setRequired(true)
                    .setPlaceholder("enter the reason")
                    .setValue(`${VoiceLength}`)
                    .setMinLength(1)
                    .setStyle(TextInputStyle.Short);

               const firstActionRow = new ActionRowBuilder().addComponents(pointsContent);
               const secondActionRow = new ActionRowBuilder().addComponents(pointsVoice);
               modal.addComponents(firstActionRow);
               modal.addComponents(secondActionRow);
               await interaction.showModal(modal);

          } catch (err) {
               console.log(err);
          }

     }
}
