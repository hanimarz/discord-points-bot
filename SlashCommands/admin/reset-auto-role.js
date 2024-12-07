module.exports = {
     name: "reset-auto-role",
     description: `clear all auto-role configurations.`,
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
               if (!getAutoRole) return interaction.reply({ content: `There is no auto role`, ephemeral: true });

               await client.dbPoints.delete(`database_${interaction.guild.id}..settings..autoRole`);
               interaction.reply({ content: `Successfully reset auto role`, ephemeral: true });

          } catch (err) {
               console.log(err)
          }
     },
};
