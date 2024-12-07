module.exports = {
     name: "reset_cancel",
     owners: true,
     /**
      * @param {import('../../Client')} client
      * @param {import('discord.js').ButtonInteraction} interaction
      */
     async actionExecute(client, interaction, parts) {
          try {

               interaction.deferUpdate();

               let guild = parts[2];
               if (!guild) return interaction.message.edit({ content: `Please provide a valid guild`, components: [], ephemeral: true });

               let getDatabase = await client.dbPoints.get(`database_${guild}`);
               if (!getDatabase) return interaction.message.edit({ content: `The database is already empty`, components: [], ephemeral: true });

               return interaction.message.edit({ content: `Canceled the reset`, components: [], ephemeral: true });
          } catch (err) {
               console.log(err);
          }

     }
}
