const canvafy = require("../../pkg/canvafy/index");
const { calculateLevelAndXP } = require('../../utils/calculateLevelAndXP');

module.exports = {
     name: "rank",
     description: `Show your rank card.`,
     options: [
          {
               name: "user",
               description: "show rank card of user",
               type: 6,
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

               let user = interaction.options.getUser('user');
               if (!user || user.bot) return interaction.reply({ content: `Please provide a valid user`, ephemeral: true });
               let member = interaction.guild.members.cache.get(user.id);
               let status = member?.presence?.status || "offline";
               let avatar = user.displayAvatarURL({ dynamic: true, size: 2048, format: "png" });
               let username = user.globalName || user.displayName || user.username;

               const UserData = await client.dbPoints.get(`database_${interaction.guild.id}..${user.id}`);
               if (!UserData) return interaction.reply({ content: `This user does not have any points`, ephemeral: true });
               if (UserData?.banned) return interaction.reply({ content: `This user is banned from the points system`, ephemeral: true });

               const guildData = await client.dbPoints.get(`database_${interaction.guild.id}`);
               if (!guildData) return interaction.reply({ content: `This server does not have any points`, ephemeral: true });

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

               await interaction.reply({
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