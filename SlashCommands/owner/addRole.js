module.exports = {
     name: "add-role",
     description: `Add an admin to the bot`,
     owners: true,
     options: [
          {
               name: "role",
               description: "Role to add as a role",
               type: 8,
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
               let role = interaction.options.getRole('role');
               if (!role) {
                    return interaction.reply({ content: "Please provide a valid role", ephemeral: true });
               }

               let roles = await client.dbPoints.get(`database_${interaction.guild.id}..settings..roles`);

               if (roles?.length >= 10) {
                    return interaction.reply({ content: "You can't have more than 10 roles", ephemeral: true });
               }

               await client.dbPoints.push(`database_${interaction.guild.id}..settings..roles`, role.id);

               return interaction.reply({ content: `Role ${role.name} has been added as a role`, ephemeral: true });
          } catch (err) {
               console.log(err)
          }
     },
};