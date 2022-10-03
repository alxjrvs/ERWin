# ERWin

## The **E**lectronic **R**emote **Win**arran

ERWin is a Discord Bot used to help manage the tasks of announcing, signing up, and eventually playing Twilight Imperium IV. Right now the bot can only exist as a Singleton, working on one channel per isntance - I may work to break this up in the future to have it work dynamically across multiples, but right now it only needs to work on a single server, so I didn't push things too hard.

This does mean that you will need to run your own ERWin for your purposes.

## Setup

- clone this repo locally
- run `$ npm install`
- Use the [Discord Developer Portal](https://discord.com/developers/) to create a new Application, then create a bot user with permissions matching `62679886928`.
  - Note the `application id`,
  - create a token, and note its value.
- In the dev portal, Create a new Oauth URL with the previously given perm interger, then visit it to install the bot on your server
- Locally, create a copy of `.env.example` named `.env`, then fill in the values
  - `TOKEN` is the bot token you made above
  - `APP_ID` is the `application_id` from the developer portal
  - `GUILD_ID` is the ID of the DIscord server you installed ERWin on
  - `SIGNUP_CHANNEL_ID` is the ID of the channel you will be using to blast alerts.

## Usage

- use `/mecatol` to make sure the bot is operational and responding to commands. Our own personal `ping`!
- use `/activate` to kick off
