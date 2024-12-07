const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
     name: "reset",
     description: `reset all database`,
     owners: true,
     /**
      * @param {import('discord.js').Client} client
      * @param {import('discord.js').Interaction} interaction
      * @param {String[]} args
      * @returns
      */
     async execute(client, interaction) {
          try {

               let guild = interaction.guild;

               let getDatabase = await client.dbPoints.get(`database_${guild.id}`);
               if (!getDatabase) return interaction.reply({ content: `The database is already empty`, ephemeral: true });

               let yes = new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setLabel("Reset")
                    .setID(`reset_${guild.id}`);

               let cancel = new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel("Cancel Reset")
                    .setID(`reset_cancel_${guild.id}`);

               const row = new ActionRowBuilder().addComponents(yes, cancel);

               return interaction.reply({ content: "You want to reset the database?", components: [row] })

          } catch (err) {
               console.log(err)
          }
     },
};