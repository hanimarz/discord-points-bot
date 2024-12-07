module.exports = {
     name: "delete_Points",
     adminRole: true,
     owners: true,
     /**
      * @param {import('../../Client')} client
      * @param {import('discord.js').ButtonInteraction} interaction
      */
     async actionExecute(client, interaction, parts) {
          try {

               interaction.deferUpdate();

               let userID = parts[2];
               if (!userID) return interaction.editReply({ content: `Please provide a valid user`, ephemeral: true });

               const UserData = await client.dbPoints.get(`database_${interaction.guild.id}..${userID}`);
               if (!UserData) return interaction.reply({ content: `This user does not have any points`, ephemeral: true });

               await client.dbPoints.delete(`database_${interaction.guild.id}..${userID}`);

               interaction.message.edit({ content: `Points deleted for <@${userID}>`, embeds: [], components: [] });

          } catch (err) {
               console.log(err);
          }

     }
}
