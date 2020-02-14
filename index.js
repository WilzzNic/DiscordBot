const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if(message.content === '!ping') {
        message.channel.send('Pong.');
    }
});

client.login('Njc2NjEzOTAxMjE1MDcyMjU5.XkIQVQ.ypIz3ZrnGbEoisP35927CB23kVs');
