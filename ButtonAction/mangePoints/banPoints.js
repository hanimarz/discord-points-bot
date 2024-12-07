const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
     name: "ban_Points",
     adminRole: true,
     owners: true,
     /**
      * @param {import('../../Client')} client
      * @param {import('discord.js').ButtonInteraction} interaction
      */
     async actionExecute(client, interaction, parts) {
          try {

               let userID = parts[2];
               if (!userID) return interaction.editReply({ content: `Please provide a valid user`, ephemeral: true });

               const UserData = await client.dbPoints.get(`database_${interaction.guild.id}..${userID}`);
               if (!UserData) return interaction.reply({ content: `This user does not have any points`, ephemeral: true });

               if (UserData?.banned) {
                    client.dbPoints.set(`database_${interaction.guild.id}..${userID}`, { ...UserData, 'banned': false, 'reason': '' });
                    return interaction.message.edit({ content: `Successfully unbanned <@${userID}>`, embeds: [], components: [] });
               } else {
                    const modal = new ModalBuilder()
                         .setCustomId(`banPoints_${userID}`)
                         .setTitle('Ban Points');

                    const resonModal = new TextInputBuilder()
                         .setCustomId('Reason_modal')
                         .setLabel("Reason")
                         .setRequired(false)
                         .setPlaceholder("type something")
                         .setMinLength(1)
                         .setStyle(TextInputStyle.Paragraph);

                    const firstActionRow = new ActionRowBuilder().addComponents(resonModal);
                    modal.addComponents(firstActionRow);
                    await interaction.showModal(modal);
               }

          } catch (err) {
               console.log(err);
          }

     }
}
