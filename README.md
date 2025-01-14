# Bot Configuration & Commands
This project provides a bot with various features for managing roles, points, and user interactions across public, admin, and owner levels.

<div align="right">
  <a href="https://discord.gg/jgh78KPbzc" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Discord&logo=discord&label=&color=5865f2&logoColor=white&labelColor=&style=for-the-badge" height="60" width="210" alt="discord logo"  />
  </a>
</div>


## Public Commands
These commands are accessible to all users.

* `/rank` Display your current rank.

# Rank
<div align="center">
  <a href="https://discord.gg/jgh78KPbzc" target="_blank">
    <img src="https://github.com/user-attachments/assets/965d574a-5193-4772-b4c3-5f8535fd51b5" alt="logo"  />
  </a>
</div>

* `/top` Display the general leaderboard.

* `/topChat` Show the leaderboard for the most active users in chat.

* `/TopVoice` Show the leaderboard for the most active users in voice channels

## Admin Commands
These commands are restricted to admins.

* `/auto-role` Assign roles to be granted automatically when users reach a level.

# Level
<div align="center">
  <a href="https://discord.gg/jgh78KPbzc" target="_blank">
    <img src="https://github.com/user-attachments/assets/8bbad7bd-6610-45d2-94cc-e6f981f41ca9" alt="logo"  />
  </a>
</div>

* `/level-channel` Setup the channel for level up messages.

* `/manage-points` Manage points of a user

* `/remove-auto-role` Remove a role from the auto-assignment list.

* `/reset-auto-role` Clear all auto-role configurations.

* `/view-auto-role` Display the list of roles currently set for auto-assignment.

## Owner Commands
These commands are restricted to the bot owner(s).

* `/AddAdmin` Grant a user admin privileges.

* `/AddRole` Grant a role admin privileges.

* `/removeAdmin` Revoke a user admin privileges.

* `/removeRole` Revoke a role admin privileges.

* `/Reset` Clear all data and restart from scratch.

* `/viewAdmins` Show current moderation settings.

## Configuration File
The configuration for this bot is stored in JSON format. Below is the structure:

```json
{
    "token": "MTMyNzA2MDE5MzE1ODIzODMxOQ.G8fVrQ.nNy660hEiWjm9hSKsook-1Elb4aWY1bBw72kZM",
    "clientId": "1327060193158238319",
    "prefix": "-",
    "adminRole": ["1328542093676904478", "", ""],
    "owners": ["", "", ""]
}
```

