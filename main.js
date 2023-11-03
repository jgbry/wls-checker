const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const axios = require('axios');
require('dotenv').config();

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = date + ' ' + month + ' ' + year + ' à ' + hour + 'h' + min;
  return time;
}

client.on('ready', () => {
  setInterval(function () {
    axios.get("https://api.wls.gg/v3/search/rooms?region=EU&registration_status=OPEN")
      .then(response => {
        const rooms = response.data.slice(0, 10);
        const roomNames = rooms.map(room =>
          "> Nom du tournois : " + room.event.name + "\n> Date de début : " + timeConverter(room.start_time) +
          "\n> Date de fin : " + timeConverter(room.end_time) + "\n> Mode de jeu : " + room.game_mode +
          "\n> [__**Lien**__](https://system-beta.warlegend.net/play/rooms/" + room.id + "/leaderboard)\n\n-------------------\n"
        ).join('');

        const embed = {
          title: 'Tournois Catégorie "JOUER" sur WarLegend',
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
          "> Nom du tournois : " + room.name + "\n> Date de début : " + timeConverter(room.window.start_time) +
          "\n> Date de fin : " + timeConverter(room.window.end_time) + "\n> Mode de jeu : " + room.game_mode +
          "\n> Prix : " + room.prizepool_total.display + `\n> Ouvert : ${room.public ? 'Oui' : 'Non'}` +
          "\n> [__**Lien**__](https://system-beta.warlegend.net/play/rooms/" + room.id + "/leaderboard)\n\n-------------------\n"
        ).join('');

        const embed = {
          title: 'Tournois Catégorie "TOURNOIS" sur WarLegend',
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
