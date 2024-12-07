require("dotenv").config();

const express = require('express');
const app = express();


app.get('/', function (request, response) {
     response.sendFile(__dirname + "/index.html");
});

app.use('/ping', (req, res) => {
     res.send(new Date());
});

app.listen(9080, () => {
     console.log('Express is ready.')
});

const { GoodDB, SQLiteDriver, JSONDriver } = require('good.db');

const dbPoints = new GoodDB(new JSONDriver({ path: './Points.json', format: true }), {
     nested: '..',
     nestedIsEnabled: true,
});


const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const config = require("./config.json");

const client = new Client({
     intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildEmojisAndStickers,
          GatewayIntentBits.GuildIntegrations,
          GatewayIntentBits.GuildWebhooks,
          GatewayIntentBits.GuildInvites,
          GatewayIntentBits.GuildVoiceStates,
          GatewayIntentBits.GuildPresences,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.GuildMessageTyping,
          GatewayIntentBits.DirectMessages,
          GatewayIntentBits.DirectMessageReactions,
          GatewayIntentBits.DirectMessageTyping,
          GatewayIntentBits.MessageContent
     ],
     partials: [
          Partials.Message,
          Partials.Channel,
          Partials.GuildMember,
          Partials.Reaction,
          Partials.GuildScheduledEvent,
          Partials.User,
          Partials.ThreadMember
     ],
     shards: "auto",
     allowedMentions: {
          parse: [],
          repliedUser: false
     },
});

client.dbPoints = dbPoints;
client.btnAction = new Collection();
client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.actionButtons = new Collection();
module.exports = client;
['Commands', 'Events', 'SlashCommands', 'ActionButton'].forEach(handler => {
     require(`./handlers/${handler}`)(client);
})

client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;


const { createLogger, transports, format } = require("winston");
const path = require("path");

const logger = createLogger({
     level: "error",
     format: format.combine(format.timestamp(), format.json()),
     transports: [
          new transports.File({
               filename: path.join(__dirname, "Logs", "Errors.json"),
          }),
     ],
});

client.on("error", (error) => {
     console.log("Discord.js error:", error);
     logger.error("Discord.js error:", error);
});

client.on("warn", (warning) => {
     console.warn("Discord.js warning:", warning);
});

let antiCrashLogged = false;

process.on("unhandledRejection", (reason, p) => {
     if (!antiCrashLogged) {
          console.log("[antiCrash] :: Unhandled Rejection/Catch");
          if (reason.message == 'Unknown Message') return
          if (reason.message == 'Unknown interaction') return
          if (p.message == 'Unknown Message') return
          if (p.message == 'Unknown interaction') return
          console.log(reason, p);
          logger.error("[antiCrash] :: Unhandled Rejection/Catch", { reason, p });
          antiCrashLogged = true;
     }
});

process.on("uncaughtException", (err, origin) => {
     if (!antiCrashLogged) {
          console.log("[antiCrash] :: Uncaught Exception/Catch");
          console.log(err, origin);
          logger.error("[antiCrash] :: Uncaught Exception/Catch", { err, origin });
          antiCrashLogged = true;
     }
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
     if (!antiCrashLogged) {
          console.log("[antiCrash] :: Uncaught Exception/Catch (MONITOR)");
          console.log(err, origin);
          logger.error("[antiCrash] :: Uncaught Exception/Catch (MONITOR)", {
               err,
               origin,
          });
          antiCrashLogged = true;
     }
});

client.login(config.token || process.env.token).catch((err) => {
     console.log(err.message)
})