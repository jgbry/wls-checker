const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const axios = require('axios');
require('dotenv').config();

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time =  month + ' ' + date + ' ' + year + ' à ' + hour + 'h' + min;
  return time;
}

client.on('ready', () => {
  setInterval(function () {
    axios.get("https://api.wls.gg/v3/search/rooms?region=EU&registration_status=OPEN")
      .then(response => {
        const rooms = response.data.slice(0, 10);
        const roomNames = rooms.map(room =>
          "> Tournament Name: " + room.event.name + "\n> Start Date: " + timeConverter(room.start_time) +
          "\n> End Date: " + timeConverter(room.end_time) + "\n> Game Mode: " + room.game_mode +
          "\n> [__**Link**__](https://system-beta.warlegend.net/play/rooms/" + room.id + "/leaderboard)\n\n-------------------\n"
        ).join('');

        const embed = {
          title: 'Tournaments Category "PLAY" on WarLegend',
          description: roomNames,
          timestamp: new Date(),
        };

        client.channels.cache.get(process.env.CHANNEL_ID_JOUER).send({ embeds: [embed] });
      })
      .catch(error => {
        console.error(error);
      });

    axios.get("https://api.wls.gg/v5/search/events?size=10&region=EU&!owner.name=EpicGames")
      .then(response => {
        const rooms = response.data.current_events;
        const roomNames = rooms.map(room =>
          "> Tournament Name: " + room.name + "\n> Start Date: " + timeConverter(room.window.start_time) +
          "\n> End Date: " + timeConverter(room.window.end_time) + "\n> Game Mode: " + room.game_mode +
          "\n> Prize: " + room.prizepool_total.display + `\n> Open: ${room.public ? 'Yes' : 'No'}` +
          "\n> [__**Link**__](https://system-beta.warlegend.net/play/rooms/" + room.id + "/leaderboard)\n\n-------------------\n"
        ).join('');

        const embed = {
          title: 'Tournaments Category "TOURNAMENTS" on WarLegend',
          description: roomNames,
          timestamp: new Date(),
        };

        client.channels.cache.get(process.env.CHANNEL_ID_TOURNOIS).send({ embeds: [embed] });
      })
      .catch(error => {
        console.error(error);
      });

  }, process.env.TIME);
});

client.login(process.env.TOKEN);
