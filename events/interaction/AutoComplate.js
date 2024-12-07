const { adminRole, owners } = require('../../config.json');

module.exports = {
    name: "interactionCreate",
    once: false,
    /**
     * 
     * @param {*} client 
     * @param {import('discord.js').AutocompleteInteraction} interaction 
     * @returns 
     */
    async execute(client, interaction) {
        if (!interaction.isAutocomplete()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command?.slashCommand?.enabled) return;

        try {

            let ServerData = await await client.dbPoints.get(`database_${interaction.guild.id}..settings`);
            let role = ServerData?.adminRole || [];
            let admins = ServerData?.admins || [];

            if (command.adminRole && !interaction.member.roles.cache.some(role => adminRole.includes(role.id)) && !owners.includes(interaction.user.id) && !interaction.member.roles.cache.some(r => role.includes(r.id)) && !admins.includes(interaction.user.id)) return interaction.reply({ content: `:x: **You don't have permission to use this command**`, ephemeral: true });
            if (command.owners && !owners.includes(interaction.user.id)) return interaction.reply({ content: `:x: **You don't have permission to use this command**`, ephemeral: true });
            await command.autocompleteExecute(client, interaction);
        } catch (err) {
            console.log(err);
            await interaction.reply({ content: 'There was an log while executing this command!', ephemeral: true });
        }
    }
}