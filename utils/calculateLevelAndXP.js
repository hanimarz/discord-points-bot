module.exports = {
     calculateLevelAndXP: (pointsContent, pointsVoice) => {
          pointsContent = Math.max(0, pointsContent);
          pointsVoice = Math.max(0, pointsVoice); 
          const totalPoints = pointsContent + pointsVoice;
          const maxLevel = 100;

          if (totalPoints >= maxLevel * 200) {
               return {
                    level: maxLevel,
                    currentXP: 100,
                    xpToNextLevel: 100,
                    totalPoints,
               };
          }

          const level = Math.floor(totalPoints / 200);
          const xpForCurrentLevel = level * 200;

          const baseXpToNextLevel = 200;
          const xpToNextLevel = Math.max(baseXpToNextLevel * Math.pow(2, level), 200);

          const currentXP = totalPoints - xpForCurrentLevel;
          const remainingXPToNextLevel = xpToNextLevel;

          return {
               level,
               currentXP: Math.floor(currentXP),
               xpToNextLevel: Math.floor(remainingXPToNextLevel),
               totalPoints,
          };
     }
};
