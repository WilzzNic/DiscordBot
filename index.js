const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');
const axios = require('axios').default;

require('dotenv').config();
const client = new Discord.Client();
const prefix = '';


client.once('ready', () => {
    console.log('Ready!');
    this.prefix = process.env.PREFIX;
});

var FieldsEmbed = null;

client.on('message', message => {
    if(message.author.bot) return;
    
    if(message.content.indexOf(this.prefix) !== 0) return;
    
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ !/g);
    const content = args.shift().toLowerCase().split(' ');
    const command = content[0];
    const parameter = content[1];
    console.log(content);
    // const command = content.toLowerCase().split(' ')[0]
    // console.log(command);
    // console.log(parameter);

    switch(command) {
        case "countries":
            countries(parameter, message);
            break;
        case "holiday":
            holiday(parameter, message);
            break;
    }

    // message.channel.send(countries); 
    
});

client.login(process.env.DISCORD_TOKEN);

// README: Fungsi dimulai dari sini ntar kita pindah

function countries(country, message) {
    console.log(country);
    axios.get('https://holidayapi.com/v1/countries?key=e5428f2a-2fab-4b47-9269-d49bb36d35d3')
    .then(function (response) {
        var object = response.data;
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
        message.channel.send('error');
        console.log(error.message);
    })
    .then(function () {
        // always executed
        
    });
}

function holiday(country, message) {
    var datetime = new Date();
    console.log(datetime);
    message.channel.send(datetime.toDateString());
}
