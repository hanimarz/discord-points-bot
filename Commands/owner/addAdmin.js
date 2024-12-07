module.exports = {
     name: "add-admin",
     description: `Add an admin to the bot`,
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
               let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(user => user.username.toLowerCase() === args.join(" ").toLowerCase());

               if (!user) {
                    return message.reply({ content: "Please provide a valid user" });
               }

               let admins = await client.dbPoints.get(`database_${message.guild.id}..settings..admins`);

               if (admins?.length >= 10) {
                    return message.reply({ content: "You can't have more than 10 admins" });
               }

               await client.dbPoints.push(`database_${message.guild.id}..settings..admins`, user.id);

               return message.reply({ content: `User ${user.displayName || user.globalName || user.username} has been added as an admin` });
          } catch (err) {
               console.log(err)
          }
     },
};