module.exports = {
     name: "auto-role",
     description: `Setup the auto role for new members`,
     aliases: [],
     adminRole: true,
     owners: true,
     /**
      * @param {import('discord.js').Client} client
      * @param {import('discord.js').Message} message
      * @param {String[]} args
      * @returns
      */
     async execute(client, message, args) {
          try {

               let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args[0]);
               if (!role) return message.reply({ content: `Please mention a role` });

               let level = parseInt(args[1]);
               if (!level) return message.reply({ content: `Please provide a level` })

               let getAutoRole = await client.dbPoints.get(`database_${message.guild.id}..settings..autoRole`);
               if (getAutoRole) {
                    if (getAutoRole[level].includes(role.id)) {
                         return message.reply({
                              content: `Auto role for level ${level} is already set to <@&${role.id}> !`
                         });
                    }
               }

               await client.dbPoints.push(`database_${message.guild.id}..settings..autoRole..${level}`, role.id);
               return message.reply({ content: `Auto role for level ${level} is set to <@&${role.id}> !` });
          } catch (err) {
               console.log(err)
          }
     },
};