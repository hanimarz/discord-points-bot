const { EmbedBuilder } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const { prefix } = require('../../config.json');

module.exports = {
    name: "help",
    description: `Feeling lost?`,
    aliases: [],
    async execute(client, interaction) {
        try {
            const globPromise = promisify(glob);
            const commandFiles = await globPromise(`${process.cwd()}/SlashCommands/public/**/*.js`);

            let embed = new EmbedBuilder()
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setColor("#161616")
            commandFiles.map((value) => {
                const file = require(value);
                const splitted = value.split("/");
                const directory = splitted[splitted.length - 2];

                if (file.name) {
                    const properties = { directory, ...file };
                    embed.addFields({ name: `/${properties.name}`, value: `${properties.description}`, inline: false })
                }
            });
            interaction.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
        }
    },
};