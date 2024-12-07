module.exports = {
     name: "remove-role",
     description: `Remove a role from the bot`,
     aliases: [],
     owners: true,
     /**
      * 
      * @param {import("discord.js").Client} client
      * @param {import("discord.js").Message} message
      * @param {String[]} args
      * @returns
      */
     async execute(client, message, args) {
          try {

               let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(role => role.name.toLowerCase() === args.join(" ").toLowerCase());

               if (!role) {
                    return message.reply({ content: "Please provide a valid role" });
               }

               let roles = await client.dbPoints.get(`database_${message.guild.id}..settings..roles`);

               if (!roles?.includes(role.id)) {
                    return message.reply({ content: "Role is not a role" });
               }

               await client.dbPoints.pull(`database_${message.guild.id}..settings..roles`, role.id);

               return message.reply({ content: `Role ${role.name} has been removed as a role` });
          } catch (err) {
               console.log(err)
          }
     },
};