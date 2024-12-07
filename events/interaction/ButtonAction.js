const { adminRole, owners } = require('../../config.json');

module.exports = {
  name: 'interactionCreate',
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ButtonInteraction} interaction 
   * @returns
   */
  async execute(client, interaction) {
    if (interaction.isButton() || interaction.isModalSubmit() || interaction.isAnySelectMenu()) {

      const customId = interaction.customId;
      const parts = customId?.split('_');
      const command = client.btnAction.get(`${parts[0]}_${parts[1]}`) || client.btnAction.get(`${parts[0]}_${parts[1]}_${parts[2]}`) || client.btnAction.get(parts[0]) || client.btnAction.get(customId);

      if (!command) return;
      try {
        let ServerData = await await client.dbPoints.get(`database_${interaction.guild.id}..settings`);
        let role = ServerData?.adminRole || [];
        let admins = ServerData?.admins || [];

        if (command.adminRole && !interaction.member.roles.cache.some(role => adminRole.includes(role.id)) && !owners.includes(interaction.user.id) && !interaction.member.roles.cache.some(r => role.includes(r.id)) && !admins.includes(interaction.user.id)) return interaction.reply({ content: `:x: **You don't have permission to use this command**`, ephemeral: true });
        if (command.owners && !owners.includes(interaction.user.id)) return interaction.reply({ content: `:x: **You don't have permission to use this command**`, ephemeral: true });
        await command.actionExecute(client, interaction, parts);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }
};
