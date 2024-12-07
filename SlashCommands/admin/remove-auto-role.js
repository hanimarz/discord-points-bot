module.exports = {
     name: "remove-auto-role",
     description: `Remove auto role`,
     adminRole: true,
     owners: true,
     options: [
          {
               name: "role",
               description: "role to remove from auto role",
               type: 8,
               required: true,
          },
          {
               name: "level",
               description: "Level to remove the role",
               type: 4,
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
               let level = interaction.options.getInteger('level');

               if (!level) return interaction.reply({ content: `Please provide a level`, ephemeral: true })
               if (isNaN(level) || level < 1 || level > 100) return interaction.reply({ content: `Please provide a valid number between 1 and 100`, ephemeral: true });

               let getAutoRole = await client.dbPoints.get(`database_${interaction.guild.id}..settings..autoRole`);
               if (getAutoRole) {
                    if (!getAutoRole[level].includes(role.id)) {
                         return interaction.reply({
                              content: `This role is not in auto role`
                         });
                    }
               }

               let getAutoRoleArray = getAutoRole[level];
               let index = getAutoRoleArray.indexOf(role.id);
               getAutoRoleArray.splice(index, 1);

               await client.dbPoints.set(`database_${interaction.guild.id}..settings..autoRole`, getAutoRole);
               interaction.reply({ content: `Successfully remove role in auto role`, ephemeral: true });

          } catch (err) {
               console.log(err)
          }
     },
};