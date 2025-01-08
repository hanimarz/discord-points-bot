module.exports = {
     calculateLevelAndXP: (pointsContent, pointsVoice) => {
          pointsContent = Math.max(0, pointsContent);
          pointsVoice = Math.max(0, pointsVoice);

          const totalPoints = pointsContent + pointsVoice;

          const maxLevel = 100;
          const baseXPPerLevel = 200;
          const maxLevelXP = maxLevel * baseXPPerLevel;

          if (totalPoints >= maxLevelXP) {
               return {
                    level: maxLevel,
                    currentXP: baseXPPerLevel,
                    xpToNextLevel: 0, 
                    totalPoints,
               };
          }

          const level = Math.floor(totalPoints / baseXPPerLevel);

          const xpForCurrentLevel = level * baseXPPerLevel;
          const xpToNextLevel = baseXPPerLevel;
          const currentXP = totalPoints - xpForCurrentLevel;

          return {
               level,
               currentXP: Math.floor(currentXP),
               xpToNextLevel: Math.floor(xpToNextLevel),
               totalPoints,
          };
     }
};
