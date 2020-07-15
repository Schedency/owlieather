const Discord = require('discord.js');
const weather = require('weather-js');
const bot = new Discord.Client();
const version = "0.0.1";
const prefix = "!";
const errorColor = "0xFF0000";
const successColor = "0x0CC327";
const normalColor = "0xFFC300";

bot.on('ready', () => {
    console.log("The bot came online!");
    bot.user.setActivity('the weather', { type: "WATCHING" });
});

bot.on('message', message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (msg.startsWith(prefix + "WEATHER")) {

        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {

            if (!args[1]) return message.channel.send("Please include a place for me to find the weather!") // Checks if a user included a second argument. If not, it will throw that error message.

            // Variables
            var current = result[0].current; // Variable for the current part of the JSON output.
            var location = result[0].location; // Variable for the location part of the JSON output.


            const embedWeather = new Discord.MessageEmbed;
            embedWeather.setDescription(`**${current.skytext}**`)
            embedWeather.setAuthor(`Weather for ${current.observationpoint}`)
            embedWeather.setThumbnail(current.imageUrl)
            embedWeather.setColor(normalColor);
            embedWeather.addField(`Timezone`, `UTC${location.timezone}`, true)
            embedWeather.addField(`Degree Type`, location.degreetype, true)
            embedWeather.addField(`Temperature`, `${current.temperature} Degrees`, true)
            embedWeather.addField(`Feels like`, `${current.feelslike} Degrees`, true)
            embedWeather.addField(`Winds`, current.winddisplay, true)
            embedWeather.addField(`Humidity`, `${current.humidity}%`, true)
            embedWeather.setFooter(`Made by Owl Productions | https://discord.gg/rAs7mZE`)

            message.channel.send(embedWeather);
        })

    }

    if (msg.startsWith(prefix + "HELP")) {

        let embedHelp = new Discord.MessageEmbed;
        embedHelp.setTitle("Bot Commands")
        embedHelp.setDescription("This is a list of all of the bot's current commands.")
        embedHelp.addField(prefix + "weather", "Shows the weather. Make sure to include a second argument!")
        embedHelp.addField(prefix + "help", "Shows a list of helpful commands.")
        embedHelp.addField(prefix + "invite", "Invite our bot to your server!")
        embedHelp.setColor(normalColor)
        embedHelp.setFooter("Made by Owl Productions | https://discord.gg/rAs7mZE");

        message.channel.send(embedHelp)

    }

    if (msg.startsWith(prefix + "INVITE")) {

        let embedInvite = new Discord.MessageEmbed;
        embedInvite.setTitle("Invite Owlieather")
        embedInvite.setDescription("Thank you for using me! Invite the weather bot Owlieather to your server! We recommend inviting the Administrator one to prevent confusion.")
        embedInvite.addField("Administrator Permissions", "This has every permission and can also bypass channel specific permissions. [Click here to invite it](https://discordapp.com/oauth2/authorize?client_id=732635998038786172&scope=bot&permissions=8)")
        embedInvite.addField("Normal Permissions", "This has all of the required permissions but does not bypass channel specific permissions. [Click here to invite it.](https://discordapp.com/oauth2/authorize?client_id=732635998038786172&scope=bot&permissions=1174528)")
        embedInvite.setColor(normalColor)
        embedInvite.setFooter("Made by Owl Productions | https://discord.gg/rAs7mZE");
        message.channel.send(embedInvite);

    }
    if (msg.startsWith(prefix + "CMD_WEATHER")) {

        let embedHelpWeather = new Discord.MessageEmbed;
        embedHelpWeather.setTitle("Weather")
        embedHelpWeather.addField("Command Usage", prefix + "weather [place], [country]")
        embedHelpWeather.addField("Command Example", prefix + "weather Oslo, Norway")
        embedHelpWeather.addField("Description", "Show the current weather for the requested state.")
        embedHelpWeather.addField("Aliases", "N/A")
        embedHelpWeather.setColor(normalColor)
        embedHelpWeather.setFooter("Made by Owl Productions | https://discord.gg/rAs7mZE")
        message.channel.send(embedHelpWeather);

    }

    if (msg.startsWith(prefix + "CMD_HELP")) {

        let embedHelpHelp = new Discord.MessageEmbed;
        embedHelpHelp.setTitle("Help")
        embedHelpHelp.addField("Command Usage", prefix + "help")
        embedHelpHelp.addField("Description", "Show the available bot commands.")
        embedHelpHelp.addField("Aliases", "N/A")
        embedHelpHelp.setColor(normalColor)
        embedHelpHelp.setFooter("Made by Owl Productions | https://discord.gg/rAs7mZE")
        message.channel.send(embedHelpHelp);

    }
    
    if (msg.startsWith(prefix + "CMD_INVITE")) {

        let embedHelpInvite = new Discord.MessageEmbed;
        embedHelpInvite.setTitle("Invite")
        embedHelpInvite.addField("Command Usage", prefix + "invite")
        embedHelpInvite.addField("Description", "Show a list of available invites")
        embedHelpInvite.addField("Aliases", "N/A")
        embedHelpInvite.setColor(normalColor)
        embedHelpInvite.setFooter("Made by Owl Productions | https://discord.gg/rAs7mZE")
        message.channel.send(embedHelpInvite);

    }

})

bot.login(token)
