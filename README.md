<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/FxL5qM0.jpg" alt="Bot logo"></a>
</p>

<h3 align="center">discord-bot-template</h3>

---

<p align="center"> 🤖 A template to create your own discord bot in Javascript using discord.js
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deploying your own bot](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This is a template for creating your own discord bot using Javascript and discord.js. It includes a basic command handler and an example command.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 16.6.0 or higher
- [npm](https://www.npmjs.com/get-npm) version 7.20.3 or higher
- [Git](https://git-scm.com/downloads) version 2.33.0 or higher

### Installing

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Change .env.example to .env
4. Create a new bot application on the [Discord Developer Portal](https://discord.com/developers/applications)
5. Copy the bot token and add it to the `.env` file
6. Copy the bot's client id and add it to the `.env` file
7. Get an invite link in the dev portal to add it to a test server
8. Get that server's id and add it to the `.env` file
9. Run `node src/register-commands-test-server` to register the example command
7. Run `node .` to start the bot and check if the command is working. You should see logged in as the bot name in the console log as well

## ⛏️ Built Using <a name = "built_using"></a>

- [discord.js](https://discord.js.org/) - Javascript Discord API Wrapper

## ✍️ Authors <a name = "authors"></a>

- [@nprosk](https://github.com/nprosk) - Idea & Initial work
