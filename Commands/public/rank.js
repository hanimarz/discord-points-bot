const canvafy = require("../../pkg/canvafy/index");
const { calculateLevelAndXP } = require('../../utils/calculateLevelAndXP');

module.exports = {
     name: "rank",
     description: `Show your rank card.`,
     aliases: [],
     /**
      * 
      * @param {import("discord.js").Client} client
      * @param {import("discord.js").Message} message
      * @param {String[]} args
      * @returns
      */
     async execute(client, message, args) {
          try {

               let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(user => user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.author;
               let member = message.guild.members.cache.get(user.id);
               let status = member?.presence?.status || "offline";
               let avatar = user.displayAvatarURL({ dynamic: true, size: 2048, format: "png" });
               let username = user.globalName || user.displayName || user.username;

               const UserData = await client.dbPoints.get(`database_${message.guild.id}..${user.id}`);
               if (!UserData) return message.reply({ content: `This user does not have any points` });
               if (UserData?.banned) return message.reply({ content: `This user is banned from the points system` });

               const guildData = await client.dbPoints.get(`database_${message.guild.id}`);
               if (!guildData) return message.reply({ content: `This server does not have any points` });

               let totalPointsArray = [];
               for (const key in guildData) {
                    const points = guildData[key].pointsContent + guildData[key].pointsVoice;
                    totalPointsArray.push({ userId: key, totalPoints: points });
               }

               totalPointsArray.sort((a, b) => b.totalPoints - a.totalPoints);
               for (let i = 0; i < totalPointsArray.length; i++) {
                    if (totalPointsArray[i].userId === user.id) {
                         UserData.rank = i + 1;
                         break;
                    }
               }

               let result = calculateLevelAndXP(UserData.pointsContent, UserData.pointsVoice);

               const rank = await new canvafy.Rank()
                    .setAvatar(avatar)
                    // .setBackground("image", "https://kingmakers.be/wp-content/uploads/2022/09/Discord_IAP_KeyVisuals_Header_01.gif")
                    .setUsername(username)
                    .setStatus(status)
                    .setBorder("#4dc3ff")
                    .setLevel(result.level)
                    .setRank(UserData.rank)
                    .setCurrentXp(result.currentXP)
                    .setRequiredXp(result.xpToNextLevel)
                    .setOverlayOpacity(0.3)
                    .build();

               message.reply({
                    files: [{
                         attachment: rank,
                         name: `rank-${user.id}.png`
                    }]
               });

          } catch (err) {
               console.log(err)
          }
     },
};