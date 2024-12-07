module.exports = {
     name: "guildMemberRemove",
     once: false,
     /**
      * @param {import('discord.js').Client} client 
      * @param {import('discord.js').GuildMember} member
      */
     async execute(client, member) {
          try {

               const UserData = await client.dbPoints.get(`database_${member.guild.id}..${member.id}`);
               if (!UserData) return;

               await client.dbPoints.delete(`database_${member.guild.id}..${member.id}`);
               console.log(`Left guild ${member.guild.name} - Deleted user ${member.user.tag}`);

          } catch (err) {
               console.log(err);
          }
     }
};
