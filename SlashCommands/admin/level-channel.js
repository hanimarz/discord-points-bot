module.exports = {
     name: "channel-level",
     description: `Setup the channel for level up messages`,
     adminRole: true,
     owners: true,
     options: [
          {
               name: "channel",
               description: "Channel to send level up messages",
               type: 7,
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
               let channel = interaction.options.getChannel('channel');
               await client.dbPoints.set(`database_${interaction.guild.id}..settings..levelChannel`, channel.id);
               return interaction.reply({ content: `Level up messages will be sent in <#${channel.id}> !`, ephemeral: true });
          } catch (err) {
               console.log(err)
          }
     },
};