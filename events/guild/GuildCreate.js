module.exports = {
    name: "guildCreate",
    once: false,
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Guild} guild
     */
    async execute(client, guild) {
        try {
            console.log(`Joined guild ${guild.name} (${guild.id})`);
        } catch (err) {
            console.log(err);
        }
    }
};