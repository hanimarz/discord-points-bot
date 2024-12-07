module.exports = {
     name: "auto-role",
     description: `Setup the auto role for new members`,
     adminRole: true,
     owners: true,
     options: [
          {
               name: "role",
               description: "Role to give to new members",
               type: 8,
               required: true,
          },
          {
               name: "level",
               description: "Level to give the role",
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
                    if (getAutoRole[level].includes(role.id)) {
                         return interaction.reply({
                              content: `Auto role for level ${level} is already set to <@&${role.id}> !`, ephemeral: true
                         });
                    }
               }

               await client.dbPoints.push(`database_${interaction.guild.id}..settings..autoRole..${level}`, role.id);

               return interaction.reply({
                    content: `Auto role for level ${level} is set to <@&${role.id}> !`, ephemeral: true
               });

          } catch (err) {
               console.log(err)
          }
     },
};