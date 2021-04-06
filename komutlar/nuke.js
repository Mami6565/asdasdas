const Discord = require('discord.js');
const a = require("../ayarlar.json");

exports.run = (client, message, args) => {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(new Discord.MessageEmbed()

                                        .setColor(a.color)                                     .setDescription("**Bu komutu kullanabilmek için `KANALLARI YÖNET` iznine sahip olmalısın!**"));
message.channel.clone().then(knl => {
  let position = message.channel.position;
  knl.setPosition(position);
  message.channel.delete(); 
  knl.send(new Discord.MessageEmbed().setDescription("**Kanal başarıyla sıfırlandı ve kopyalandı.**").setColor(a.color).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setImage("https://media2.giphy.com/media/3o7abwbzKeaRksvVaE/giphy.gif")).then(x=> x.delete({timeout: 10000}))
});
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
    name: 'nuke',
  description: 'Benim botumda ki nuke komutu işte',
  usage: 'nuke'
};