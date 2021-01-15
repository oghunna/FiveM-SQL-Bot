const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "USER", "REACTION"] });
const { token, prefix, logo, hex_color, community_name, role_access_id, discord_logs_channel_id, database_host, database_user, database_password, database_base, money,  job, bank, permission_level, group, playername, dateofbirth, sex, height, phone_number, rpkill} = require('./config.json');
var mysql = require('mysql')
const bot = new Discord.Client();

var con = mysql.createConnection({
    host: database_host,
    user: database_user,
    password: database_password,
    database: database_base
})
con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL połączone!")
})

function addWhitelist(steamhex) {
    var sql = `INSERT INTO whitelist SET identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Money Updated Successfully For Player " + steamhex)
    });
}



function sendSuccsess(action, admin, chnl, steamhex) {
    const chnlsucc = new Discord.MessageEmbed()
	.setColor(hex_color)
	.setAuthor(`${community_name}`, logo)
    .setTitle('Akcja wykonana pomyślnie!')
    .setDescription(`${admin.toString()}, Dodano **${steamhex}** do whitelist'y.`)
    chnl.send(chnlsucc);

    client.channels.fetch(discord_logs_channel_id)
    .then(channel => {
        const SuccEmbed = new Discord.MessageEmbed()
            .setAuthor(`${community_name} - BotLog`, logo)
            .setTitle(`Aktualizacja ${action}`)
            .setDescription(`${admin.toString()}, Dodał ${steamhex}** do whitelist'y.`)
            .setColor(hex_color);
        channel.send(SuccEmbed);
    })
}

client.on('ready', () => {
    console.log(community_name + "'s Update Player BOT has been loaded.");
    client.user.setActivity("ExperienceRP", {
        type: "WATCHING",
        name: "!pomoc"
      });
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == "wl") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        if (args[0] == undefined)return message.reply('Wprowadz prawidłowy hex! steam:hex');
        if (!args[0].includes("steam:"))return message.reply('Wprowadz prawidłowy hex! steam:hex');
        if (!money)return message.reply('This field is disabled by config.json');
        addWhitelist(args[0])
        sendSuccsess('wl', message.author, message.channel, args[0])    
    }

    if(command == "pomoc") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " - WhiteList", logo)
        .addFields(
            { name: 'Komenda - Dodaj do whitelist', value: '!serwer steam:``hex`` wl', inline: true })
        message.channel.send(sendusage);
    }
})



client.login(token);