// import discord.js as Discord
const Discord = require('discord.js');
// import snekfetch as get to be used for catpics
const { get } = require('snekfetch')
// import params such as token and whatnot from config.json
const { prefix, token } = require('./config.json');
// setup discord client
const client = new Discord.Client();

// once the bot is ready/online print in console that it's online.
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('I guess we\'ll never know');
});

client.on('message', message => {
    // logging command that logs all messages sent in guilds the bot is a member of. disabled because it clogs console.
    // console.log(`${message.author.tag} (UID: ${message.author}) said: ${message.content} in ${message.channel.name} (CID: ${message.channel}) of ${message.guild} (GID: ${message.guild.id}).`)
    // useless command that I still haven't deleted for some reason and don't plan to delete xD
    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send("Pong!")
    } 
    // command that sends random cat pictures from the cat picture api "https://aws.random.cat/meow"
    else if (message.content.startsWith(`${prefix}catpic` || `${prefix}catpics` || `${prefix}cat` || `${prefix}cats` || `${prefix}catpicture` || `${prefix}catpictures`)) {
        try {
            // get the picture from the api
			get('https://aws.random.cat/meow').then(res => {
                // set embed
                const embed = new Discord.MessageEmbed()
                // set embed params
                .setTitle('Cute Cats!')
                .setColor(0x7289DA)
                .setAuthor('b1nzyBot', 'https://cdn.discordapp.com/attachments/794323054317928478/794385737235562506/image.png')
                .setImage(res.body.file)
                // send embed
				return message.channel.send({embed});
            });
        // error handling
		} catch(err) {
			return message.channel.send(err.stack);
		}
    }
    
    // check to see if user initiating the command has kick members permission
    if (message.member.hasPermission('KICK_MEMBERS')) {
        // if the user does have the permission and the command they initiate is "kick" then proceed
        if (message.content.startsWith(`${prefix}kick`)) {

            // check for a mentioned member in the command
            let member = message.mentions.members.first();
            // kick the mentioned member
            member.kick().then((member) => {
                // say the member has been kicked
                message.channel.send(`<@${member.id}> has been kicked`)
                // and just for fun, below we add a few reactions to the message saying that the member was kicked.
                .then (function (message) {
                    message.react('👋')
                    message.react('🇧')
                    message.react('🇾')
                    message.react('🇪')
                }).catch(function() {
                    console.log(`I caught something. I don't know what, but I caught something...`)
                   });
            })
        }
    }
})

// logs into discord
client.login(token);
