module.exports = {
     name: "remove-role",
     description: `Remove a role from the bot`,
     owners: true,
     options: [
          {
               name: "role",
               description: "Role to remove as a role",
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

               if (!roles?.includes(role.id)) {
                    return interaction.reply({ content: "Role is not a role", ephemeral: true });
               }

               await client.dbPoints.pull(`database_${interaction.guild.id}..settings..roles`, role.id);

               return interaction.reply({ content: `Role ${role.name} has been removed as a role`, ephemeral: true });
          } catch (err) {
               console.log(err)
          }
     },
};