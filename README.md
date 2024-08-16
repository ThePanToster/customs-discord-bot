# Customs Discord Bot ![Repo size](https://img.shields.io/github/repo-size/ThePanToster/customs-discord-bot) [![CodeFactor](https://img.shields.io/codefactor/grade/github/ThePanToster/customs-discord-bot/main)](https://www.codefactor.io/repository/github/ThePanToster/customs-discord-bot) [![License](https://img.shields.io/github/license/ThePanToster/customs-discord-bot)](https://github.com/ThePanToster/customs-discord-bot/blob/main/LICENSE)

A Discord bot created with [Discord.js](https://github.com/discordjs/discord.js) to help randomly create and manage teams to play custom matches in online games.

## Invite the bot to your server

[https://discord.com/api/oauth2/authorize?client_id=768137231344468012&permissions=1497332444241&scope=bot](https://discord.com/api/oauth2/authorize?client_id=768137231344468012&permissions=1497332444241&scope=bot)

## Run the bot using docker

Install [Docker](https://docs.docker.com/get-docker) and then run a container replacing `[Your token]` with your actual bot token and `[Your bot ID]` with your bot's ID:

```sh
docker run -d --name CustomsDiscordBot -e TOKEN=[Your token] -e CLIENTID=[Your bot ID] thepantoster/customsdiscordbot
```

## Run the bot manually

### Requirements

- [Node.js](https://github.com/nodejs/node)
- [Discord.js](https://github.com/discordjs/discord.js)
- Discord bot token

### Setup

Create `.env` file inside the repository replacing `[Your token]` with your actual bot token and `[Your bot ID]` with your bot's ID that you can get by right clicking it in discord with dev mode on:

```sh
TOKEN = "[Your token]"
CLIENTID = "[Your bot ID]"
```

### Launch

Run `node .` inside root directory
