# 🤖 Discord Bot

Bot to retrieve the upcoming events in the 'Tournaments' and 'Play' categories on the WarLegend platform and send them to a specific channel at a specific interval.

## 🚧 Prérequis

* Node.js 16+
* Discord.js 14+

## 🛠 How to configure it ?

.env
```json
{
TOKEN = YOUR_TOKEN_HERE
CHANNEL_ID_TOURNOIS = CHANNEL_ID_TOURNOIS # Channel to send message "Tournois"
CHANNEL_ID_JOUER = CHANNEL_ID_JOUER # Channel to send message "JOUER"
TIME = 86400000 # TIME BETWEEN SENDING EACH MESSAGE (Default : 24h = 86400000)
}
```
To obtain a token, visit https://discord.com/developers/applications/

## 🟢 How to start ?
```bash
node main.js # To start client
```

## 📝 [Support Server](https://discord.gg/krZQgUVx6j)
If you encounter problems with the bot, join us and ask for help" in English.

## Made with ❤️ !

## 📌 Crédit WLS
War Legend System : https://wls.gg
