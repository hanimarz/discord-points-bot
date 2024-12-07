const canvafy = require("../../pkg/canvafy/index");

module.exports = {
     name: "top",
     description: "Show the top users with the most points.",
     aliases: [],
     /**
      * 
      * @param {import("discord.js").Client} client
      * @param {import("discord.js").Message} message
      * @param {String[]} args
      * @returns {Promise<void>}
      */
     async execute(client, message, args) {
          try {
               const guildData = await client.dbPoints.get(`database_${message.guild.id}`);
               if (!guildData) {
                    return message.reply({ content: "This server does not have any points." });
               }

               const totalPointsArray = Object.entries(guildData)
                    .filter(([_, data]) => !data.banned)
                    .map(([userId, data]) => ({
                         userId,
                         totalPoints: data.pointsContent + data.pointsVoice,
                    }));

               const topUsers = totalPointsArray
                    .filter(user => user.totalPoints > 0)
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .slice(0, 10)
                    .map((user, index) => ({
                         ...user,
                         rank: index + 1,
                    }));

               if (topUsers.length === 0) {
                    return message.reply({ content: "No users have points in this server." });
               }

               const abbreviateNumber = (number) => {
                    if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1)}M`;
                    if (number >= 1_000) return `${(number / 1_000).toFixed(1)}K`;
                    return number.toString();
               };

               const topUsersData = await Promise.all(
                    topUsers.map(async (user) => {
                         try {
                              const discordUser = await client.users.fetch(user.userId);
                              return {
                                   top: user.rank,
                                   avatar: discordUser.displayAvatarURL({ dynamic: false, format: "png" }),
                                   tag: discordUser.displayName || discordUser.globalName || discordUser.username,
                                   score: abbreviateNumber(user.totalPoints),
                              };
                         } catch {
                              return {
                                   top: user.rank,
                                   avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
                                   tag: "Unknown User",
                                   score: abbreviateNumber(user.totalPoints),
                              };
                         }
                    })
               );

               const leaderboardImage = await new canvafy.Top()
                    .setOpacity(0.3)
                    .setScoreMessage("Total")
                    // .setBackground("image", "https://kingmakers.be/wp-content/uploads/2022/09/Discord_IAP_KeyVisuals_Header_01.gif")
                    .setUsersData(topUsersData)
                    .build();

               await message.reply({
                    files: [
                         {
                              attachment: leaderboardImage,
                              name: `top-${message.guild.id}.png`,
                         },
                    ],
               });

          } catch (err) {
               console.error(err);
          }
     },
};
