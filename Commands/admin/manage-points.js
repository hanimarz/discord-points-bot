const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
     name: "manage-points",
     description: `manage points of a user`,
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

               let userID = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(user => user.username === args[0]) || client.users.cache.find(user => user.tag === args[0]) || client.users.cache.find(user => user.id === args[0]);

               if (!userID || userID.bot) return message.reply({ content: `Please provide a valid user` });
               if (userID.id === message.author.id) return message.reply({ content: `You cannot ban yourself` });

               const UserData = await client.dbPoints.get(`database_${message.guild.id}..${userID.id}`);
               if (!UserData) return message.reply({ content: `This user does not have any points` });

               const embed = new EmbedBuilder()
                    .setAuthor({ name: `Manage Points`, iconURL: message.guild.iconURL() })
                    .setDescription(`Manage points for <@${userID.id}>`)
                    .setColor('#161616')
                    .setTimestamp()
                    .setThumbnail(userID.displayAvatarURL({ dynamic: true }))
                    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })

               if (UserData?.banned) {
                    embed.addFields({ name: `Banned`, value: `${UserData.reason}`, inline: true })
               } else {
                    embed.addFields([
                         { name: `Content`, value: `${UserData.pointsContent}`, inline: true },
                         { name: `Voice`, value: `${UserData.pointsVoice}`, inline: true }
                    ])
               }

               const manage_Points = new ButtonBuilder()
                    .setCustomId(`manage_Points_${userID.id}`)
                    .setLabel("Manage Points")
                    .setStyle(ButtonStyle.Secondary);

               const delete_Points = new ButtonBuilder()
                    .setCustomId(`delete_Points_${userID.id}`)
                    .setLabel("Delete Points")
                    .setStyle(ButtonStyle.Secondary);

               let ban_Points = new ButtonBuilder()
                    .setCustomId(`ban_Points_${userID.id}`)

               if (UserData?.banned) {
                    ban_Points.setLabel("Unban Points")
                    ban_Points.setStyle(ButtonStyle.Success);
               } else {
                    ban_Points.setLabel("Ban Points")
                    ban_Points.setStyle(ButtonStyle.Danger);
               }

               const row = new ActionRowBuilder().addComponents(manage_Points, delete_Points, ban_Points);
               return message.reply({ embeds: [embed], components: [row] });

          } catch (err) {
               console.log(err)
          }
     },
};