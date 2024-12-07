module.exports = {
     name: "add-admin",
     description: `Add an admin to the bot`,
     owners: true,
     options: [
          {
               name: "user",
               description: "User to add as an admin",
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

               let user = interaction.options.getUser('user');
               if (!user) {
                    return interaction.reply({ content: "Please provide a valid user", ephemeral: true });
               }

               let admins = await client.dbPoints.get(`database_${interaction.guild.id}..settings..admins`);

               if (admins?.length >= 10) {
                    return interaction.reply({ content: "You can't have more than 10 admins", ephemeral: true });
               }

               await client.dbPoints.push(`database_${interaction.guild.id}..settings..admins`, user.id);

               return interaction.reply({ content: `User ${user.displayName || user.globalName || user.username} has been added as an admin`, ephemeral: true });

          } catch (err) {
               console.log(err)
          }
     },
};