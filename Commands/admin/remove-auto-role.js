module.exports = {
     name: "remove-auto-role",
     description: `Remove auto role`,
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
               let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
               if (!role) {
                    const roleName = args.slice(0, -1).join(' ');
                    role = message.guild.roles.cache.find(r => r.name === roleName);
               }
               if (!role) return message.reply({ content: `Please mention a role or provide a valid role ID/name.` });

               let level = parseInt(args[args.length - 1]); 
               if (!level) return message.reply({ content: `Please provide a level.` });
               if (isNaN(level) || level < 1 || level > 100) return message.reply({ content: `Please provide a valid number between 1 and 100.` });

               let getAutoRole = await client.dbPoints.get(`database_${message.guild.id}..settings..autoRole`);

               if (!getAutoRole || !getAutoRole[level]) {
                    return message.reply({
                         content: `No auto role found for level ${level}.`,
                    });
               }

               if (!getAutoRole[level].includes(role.id)) {
                    return message.reply({
                         content: `This role is not in the auto role for level ${level}.`,
                    });
               }

               let getAutoRoleArray = getAutoRole[level];
               let index = getAutoRoleArray.indexOf(role.id);
               if (index !== -1) {
                    getAutoRoleArray.splice(index, 1);
               }

               await client.dbPoints.set(`database_${message.guild.id}..settings..autoRole`, getAutoRole);

               message.reply({ content: `Successfully removed role from auto role for level ${level}.` });

          } catch (err) {
               console.error(err);
          }
     },
};
