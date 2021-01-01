/*








                        HI, IF YOU ARE HERE.
                        THEN PLEASE LEAVE
                            THERE IS SOMEGUYS CALLED 
                            NOAM#2111 AND AIZIK#5555
                            THEY WORKED ONE DAY FOR THAT BEUTIFULL BOT
                            AND THEY DON'T WANT SOMEBODY WILL TAKE THERE CREDIT.                      MADE BY AIZIK#5555 AND NOAM#2111
                                IF YOU WANT TO REMOVE CREDIT AT LEAST BE NICE MAN AND NOT THE "BAD ISRAELI" AS WE KNOWN,
                                AND TELL US FIRST, WE WILL ALWAYS AGREE WE JUST WANT TO SEE WHOS USING OUR BOT :)
                                    I HOPE THAT HELPS A LOT OF YOU EVEN WORLDWIDE.
                                            MADE                    MADE
                                            BY                      BY
                                            AIZIK                   AIZIK
                                            #5555                   #5555
                                            AND                     AND
                                            MADE                    MADE
                                            BY                      BY
                                            NOAM                   NOAM
                                            #2111                   #2111



                                            BTW I REALLY THINK I DREW HERE SOMETHING LOL
                                                        AND AS YOU KNOW:

                                                        MADE BY NOAM#2111
                                                        MADE BY AIZIK#5555
                                                        





























*/
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "USER", "REACTION"] });
const { token, prefix, logo, hex_color, community_name, role_access_id, discord_logs_channel_id, database_host, database_user, database_password, database_base, money,  job, bank, permission_level, group, playername, dateofbirth, sex, height, phone_number, rpkill} = require('./config.json');
var mysql = require('mysql')

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

function updateMoney(steamhex, amount) {
            var sql = `UPDATE users SET money = '${amount}' WHERE identifier = '${steamhex}'`;
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
function updateBank(steamhex, amount) {
    var sql = `UPDATE users SET bank = '${amount}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Bank Updated Successfully For Player " + steamhex)
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
function updatePlayerName(steamhex, firstname, lastname) {
    var sql = `UPDATE users SET firstname = '${firstname}', lastname = '${lastname}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Player Name Successfully For Player " + steamhex)
});
}
function updateDate(steamhex, dateofbirth) {
    var sql = `UPDATE users SET dateofbirth = '${dateofbirth}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Date Of Birth Successfully For Player " + steamhex)
});
}
function updateSex(steamhex, sex) {
    var sql = `UPDATE users SET sex = '${sex}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Sex Successfully For Player " + steamhex)
});
}
function updateHeight(steamhex, height) {
    var sql = `UPDATE users SET height = '${height}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Height Successfully For Player " + steamhex)
});
}
function updatePhoneNum(steamhex, phone_number) {
    var sql = `UPDATE users SET phone_number = '${phone_number}' WHERE identifier = '${steamhex}'`;
    con.query(sql, function (result){
    if (result) { console.log(result) }
    console.log("Phone Number Successfully For Player " + steamhex)
});
}
function doRPKILL(steamhex, admin, chnl) {
    let run = ['users', 'user_inventory', 'billing', 'user_accounts', 'characters']
    for (var i=0; i < run.length; i++) {
        var sql = `DELETE FROM ${run[i]} WHERE identifier = '${steamhex}'`;
        con.query(sql, function (result){
            if (result) { console.log(result) }
            });
    }
    let run1 = ['user_licenses', 'owned_vehicles']
    for (var i=0; i < run1.length; i++) {
        var sql1 = `DELETE FROM ${run1[i]} WHERE owner = '${steamhex}'`;
        con.query(sql1, function (result){
            if (result) { console.log(result) }
            });
    }
    console.log("RP Kill Successfully Done For Player " + steamhex)
    
    const chnlsucc = new Discord.MessageEmbed()
	.setColor(hex_color)
	.setAuthor(`${community_name} RP Kill System`, logo)
    .setTitle('RP Kill Done Succsessfully!')
    .setDescription(`${admin.toString()}, Done RP Kill To Player: ${steamhex}`)
	
	.setFooter('Made By Aizik#5555 | Noam#2111', logo);
    chnl.send(chnlsucc);

    client.channels.fetch(discord_logs_channel_id)
    .then(channel => {
        const SuccEmbed = new Discord.MessageEmbed()
            .setAuthor(`${community_name} RP Kills Logs`, logo)
            .setTitle(`New RP Kill`)
            .setDescription(`${admin.toString()}, Done RP Kill To Player: ${steamhex}`)
            
            .setFooter('Made By Aizik#5555 | Noam#2111', logo)
            .setColor(hex_color);
        channel.send(SuccEmbed);
    })
}


function sendSuccsess(action, admin, chnl, steamhex) {
    const chnlsucc = new Discord.MessageEmbed()
	.setColor(hex_color)
	.setAuthor(`${community_name} Update Player System`, logo)
    .setTitle('Player Updated Succsessfully!')
    .setDescription(`${admin.toString()}, Updated **${action}** To Player: ${steamhex}`)
	
	.setFooter('Made By Aizik#5555 | Noam#2111', logo);
    chnl.send(chnlsucc);

    client.channels.fetch(discord_logs_channel_id)
    .then(channel => {
        const SuccEmbed = new Discord.MessageEmbed()
            .setAuthor(`${community_name} Update Player Logs`, logo)
            .setTitle(`New ${action} Update!`)
            .setDescription(`${admin.toString()}, Updated **${action}** To Player: ${steamhex}`)
            
            .setFooter('Made By Aizik#5555 | Noam#2111', logo)
            .setColor(hex_color);
        channel.send(SuccEmbed);
    })
}


function sendcoms(chnl) {
    const sendusage = new Discord.MessageEmbed()
	.setColor(hex_color)
	.setAuthor(community_name + " Update Player Commands", logo)
    .addFields(
        { name: 'Update Player Commands', value: ' \n``!money`` - Update Money Usage\n``!job`` - Update Job Usage\n``!bank`` - Update Bank Usage\n``!permission_level`` - Update Permission Level Usage\n``!group`` - Update Group Usage\n``!playername`` - Update Player Name Usage\n``!dateofbirth`` - Update Date Of Birth Usage\n``!sex`` - Update Sex Usage\n``!height`` - Update Height Usage\n``!phone_number`` - Update Phone Number Usage\n``!rpkill`` - Resets Player', inline: true })
    
	.setFooter('Made By Noam#2111 | Aizik#5555', logo);
    chnl.send(sendusage);
}

client.on('ready', () => {
    console.log(community_name + "'s Update Player BOT has been loaded.");
    console.log("Made By Noam#2111 | Aizik#5555");
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == "set") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        if (args[0] == undefined)return message.reply('you must enter a vaild steam hex');
        if (!args[0].includes("steam:"))return message.reply('you must enter a vaild steam hex');


        if (args[1] == 'money') {
            if (args[2] == undefined)return message.reply('You must enter a vaild money amount!');
            if (!money)return message.reply('This field is disabled by config.json');
            updateMoney(args[0], args[2])
            sendSuccsess('money', message.author, message.channel, args[0])   
        } else if (args[1] == 'job') {
            if (args[2] == undefined)return message.reply('You must enter job!');
            if (args[3] == undefined)return message.reply('You must enter jobgrade!');
            if (!job)return message.reply('This field is disabled by config.json');
            updateJob(args[0], args[2], args[3])
            sendSuccsess('job', message.author, message.channel, args[0])   
        } else if (args[1] == 'bank') {
            if (args[2] == undefined)return message.reply('You must enter a vaild bank amount!');
            if (!bank)return message.reply('This field is disabled by config.json');
            updateBank(args[0], args[2])
            sendSuccsess('bank', message.author, message.channel, args[0])  
        } else if (args[1] == 'permission_level') {
            if (args[2] == undefined)return message.reply('You must enter a vaild permission level!');
            if (!permission_level)return message.reply('This field is disabled by config.json');
            updatePermlvl(args[0], args[2])
            sendSuccsess('permission_level', message.author, message.channel, args[0])   
        } else if (args[1] == 'group') {
            if (args[2] == undefined)return message.reply('You must enter a vaild group!');
            if (!group)return message.reply('This field is disabled by config.json');
            updateGroup(args[0], args[2])
            sendSuccsess('group', message.author, message.channel, args[0])   
        } else if (args[1] == 'playername') {
            if (args[2] == undefined)return message.reply('You must enter first name!');
            if (args[3] == undefined)return message.reply('You must enter second name!');
            if (!playername)return message.reply('This field is disabled by config.json');
            updatePlayerName(args[0], args[2], args[3])
            sendSuccsess('playername', message.author, message.channel, args[0])   
        } else if (args[1] == 'dateofbirth') {
            if (args[2] == undefined)return message.reply('You must enter a vaild date of birth!');
            if (!dateofbirth)return message.reply('This field is disabled by config.json');
            updateDate(args[0], args[2])
            sendSuccsess('dateofbirth', message.author, message.channel, args[0])   
        } else if (args[1] == 'sex') {
            if (args[2] != 'm' && args[2] != 'f')return message.reply('You must enter a vaild sex!');
            if (!sex)return message.reply('This field is disabled by config.json');
            updateSex(args[0], args[2])
            sendSuccsess('sex', message.author, message.channel, args[0])   
        } else if (args[1] == 'height') {
            if (args[2] == undefined)return message.reply('You must enter a vaild height!');
            if (!height)return message.reply('This field is disabled by config.json');
            updateHeight(args[0], args[2])
            sendSuccsess('height', message.author, message.channel, args[0])   
        } else if (args[1] == 'phone_number') {
            if (args[2] == undefined)return message.reply('You must enter a vaild phone number!');
            if (!phone_number)return message.reply('This field is disabled by config.json');
            updatePhoneNum(args[0], args[2])
            sendSuccsess('phone_number', message.author, message.channel, args[0])   
        }
    }

    if(command == "coms") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        sendcoms(message.channel)
    }
    if(command == "rpkill") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        if (!rpkill)return message.reply('This field is disabled by config.json');
        if (args[0] == undefined)return message.reply('you must enter a vaild steam hex');
        if (!args[0].includes("steam:"))return message.reply('you must enter a vaild steam hex');
        doRPKILL(args[0], message.author, message.channel)
        sendSuccsess('rpkill', message.author, message.channel, args[0])   
    }
    if(command == "money") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Money Player Command', value: '!set [steamhex] money [amount]', inline: true })
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
        message.channel.send(sendusage);
    }
    if(command == "job") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Job Player Command', value: '!set [steamhex] job [jobname] [jobgrade]', inline: true })
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
        message.channel.send(sendusage);
    }
    if(command == "bank") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Bank Player Command', value: '!set [steamhex] bank [amount]', inline: true })
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
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
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
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
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
        message.channel.send(sendusage);
    }
    if(command == "playername") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Player Name Command', value: '!set [steamhex] playername [firstname] [lastname]', inline: true })
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
        message.channel.send(sendusage);
    }
    if(command == "dateofbirth") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Date Player Command', value: '!set [steamhex] date [mm-dd-yyyy]', inline: true })
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
        message.channel.send(sendusage);
    }
    if(command == "sex") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Sex Player Command', value: '!set [steamhex] sex [m/f]', inline: true })
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
        message.channel.send(sendusage);
    }
    if(command == "height") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Height Player Command', value: '!set [steamhex] height [amount]', inline: true })
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
        message.channel.send(sendusage);
    }
    if(command == "phone_number") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const sendusage = new Discord.MessageEmbed()
        .setColor(hex_color)
        .setAuthor(community_name + " Set Player Usage", logo)
        .addFields(
            { name: 'Set Phone Number Player Command', value: '!set [steamhex] phone_number [number]', inline: true })
        
        .setFooter('Made By Noam#2111 | Aizik#5555', logo);
        message.channel.send(sendusage);
    }
})



client.login(token);