const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if(message.content === '!ping') {
        message.channel.send('Pong.');
    }
});

client.login(process.env.DISCORD_TOKEN);
