const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');
const axios = require('axios').default;

require('dotenv').config();

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

var FieldsEmbed = null;

client.on('message', message => {
    if(message.author.bot) return;

    if(message.content.indexOf(process.env.PREFIX) !== 0) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ !/g);
    const command = args.shift().toLowerCase();

    if(command == "countries") {
        axios.get('https://holidayapi.com/v1/countries?key=e5428f2a-2fab-4b47-9269-d49bb36d35d3')
        .then(function (response) {
            console.table(response);
            var object = response;

            FieldsEmbed = new Pagination.FieldsEmbed()
                .setArray(object.countries)
                .setAuthorizedUsers([])
                .setChannel(message.channel)
                .setElementsPerPage(10)
                .setPageIndicator(true)
                .formatField('Continue..', o => o.name);
            
            FieldsEmbed.build();
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
            
        });
    }

    // message.channel.send(countries); 
    
});

client.login(process.env.DISCORD_TOKEN);