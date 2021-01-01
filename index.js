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
    console.log("MySQL connected!")
})
function addWhitelist(steamhex) {
    var sql = `INSERT INTO whitelist SET identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Money Updated Successfully For Player " + steamhex)
    });
}
function updateJob(steamhex, job, grade) {
    var sql = `UPDATE users SET job = '${job}', job_grade = '${grade}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Job Updated Successfully For Player " + steamhex)
});
}
function updatePermlvl(steamhex, prmlvl) {
    var sql = `UPDATE users SET permission_level = '${prmlvl}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Permission Level Updated Successfully For Player " + steamhex)
});
}
function updateGroup(steamhex, group) {
    var sql = `UPDATE users SET group = '${group}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Group Updated Successfully For Player " + steamhex)
});
}


function sendSuccsess(action, admin, chnl, steamhex) {
    const chnlsucc = new Discord.MessageEmbed()
	.setColor(hex_color)
	.setAuthor(`${community_name}`, logo)
    .setTitle('Akcja wykonana pomyślnie!')
    .setDescription(`${admin.toString()}, Zaktualizowano **${action}** dla gracza **${steamhex}**`)
    chnl.send(chnlsucc);

    client.channels.fetch(discord_logs_channel_id)
    .then(channel => {
        const SuccEmbed = new Discord.MessageEmbed()
            .setAuthor(`${community_name} - BotLog`, logo)
            .setTitle(`Aktualizacja ${action}`)
            .setDescription(`${admin.toString()}, Zaktualizowano **${action}** dla gracza** ${steamhex}**`)
            .setColor(hex_color);
        channel.send(SuccEmbed);
    })
}


function sendcoms(chnl) {
    const sendusage = new Discord.MessageEmbed()
	.setColor(hex_color)
	.setAuthor(community_name + " - Pomoc", logo)
    .addFields(
        { name: 'Pomoc', value: ' \n``!wl`` - Użycie ADD-WL\n``!praca`` - Użycie S-JOB\n``!perm-lvl`` - Użycie S-PERMLVL\n``!group`` - Użycie S-GROUP', inline: true })
    chnl.send(sendusage);
}

client.on('ready', () => {
    console.log(community_name + "'s Update Player BOT has been loaded.");
    console.log("Made By Noam#2111 | Aizik#5555");
    client.user.setPresence({
        status: "idle",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "!pomoc",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == "serwer") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        if (args[0] == undefined)return message.reply('Wprowadz prawidłowy hex!');
        if (!args[0].includes("steam:"))return message.reply('Wprowadz prawidłowy hex!');


        if (args[1] == 'wl') {
            if (!money)return message.reply('This field is disabled by config.json');
            addWhitelist(args[0])
            sendSuccsess('wl', message.author, message.channel, args[0])   
        } else if (args[1] == 'praca') {
            if (args[2] == undefined)return message.reply('You must enter job!');
            if (args[3] == undefined)return message.reply('You must enter jobgrade!');
            if (!job)return message.reply('This field is disabled by config.json');
            updateJob(args[0], args[2], args[3])
            sendSuccsess('job', message.author, message.channel, args[0])   
        } else if (args[1] == 'perm-lvl') {
            if (args[2] == undefined)return message.reply('You must enter a vaild permission level!');
            if (!permission_level)return message.reply('This field is disabled by config.json');
            updatePermlvl(args[0], args[2])
            sendSuccsess('permission_level', message.author, message.channel, args[0])   
        } else if (args[1] == 'group') {
            if (args[2] == undefined)return message.reply('You must enter a vaild group!');
            if (!group)return message.reply('This field is disabled by config.json');
            updateGroup(args[0], args[2])
            sendSuccsess('group', message.author, message.channel, args[0])   
        }
    }

    if(command == "pomoc") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        sendcoms(message.channel)
    }
    if(command == "wl") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " - WhiteList", logo)
        .addFields(
            { name: 'Komenda - Dodaj do whitelist', value: '!serwer steam:``hex`` wl', inline: true })
        message.channel.send(sendusage);
    }
    if(command == "praca") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " - Praca", logo)
        .addFields(
            { name: 'Komenda - Ustaw prace', value: '!serwer steam:``hex`` praca ``nazwapracy`` ``stopien``', inline: true })
        message.channel.send(sendusage);
    }
    if(command == "permission_level") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Permission Level Player Command', value: '!set [steamhex] permission_level [amount]', inline: true })
        message.channel.send(sendusage);
    }
    if(command == "group") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Group Player Command', value: '!set [steamhex] group [amount]', inline: true })
        message.channel.send(sendusage);
    }
})



client.login(token);