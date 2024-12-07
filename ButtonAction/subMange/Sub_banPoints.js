module.exports = {
     name: "banPoints",
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

               const reason = interaction.fields.getTextInputValue('Reason_modal');
               const UserData = await client.dbPoints.get(`database_${interaction.guild.id}..${userID}`);
               if (!UserData) return interaction.reply({ content: `This user does not have any points`, ephemeral: true });

               if (UserData?.banned) {
                    client.dbPoints.set(`database_${interaction.guild.id}..${userID}`, { ...UserData, 'banned': false, 'reason': '' });
                    return interaction.message.edit({ content: `Successfully unbanned <@${userID}>`, embeds: [], components: [] });
               } else {
                    client.dbPoints.set(`database_${interaction.guild.id}..${userID}`, { ...UserData, 'banned': true, 'reason': reason });
                    return interaction.message.edit({ content: `Successfully banned <@${userID}>`, embeds: [], components: [] });
               }

          } catch (err) {
               console.log(err);
          }

     }
}
