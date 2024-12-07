const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
     name: "reset",
     description: `reset all database`,
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

               let guild = message.guild;
               let getDatabase = await client.dbPoints.get(`database_${guild.id}`);
               if (!getDatabase) return message.reply({ content: `The database is already empty` });

               let yes = new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setLabel("Reset")
                    .setCustomId(`reset_${guild.id}`);

               let cancel = new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel("Cancel Reset")
                    .setCustomId(`reset_cancel_${guild.id}`);

               const row = new ActionRowBuilder().addComponents(yes, cancel);

               return message.reply({ content: "You want to reset the database?", components: [row] })

          } catch (err) {
               console.log(err)
          }
     },
};