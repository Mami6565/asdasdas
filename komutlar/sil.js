const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
let sa = await db.fetch(`sillog_${message.guild.id}`)
      let silmek = args[0]

if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(`**__Bu komutu yalnızca Mesajları Yönet Yetkisine Sahip Kişiler kullanabilir !__**`)
    }

  if (!silmek) return message.reply('**__Bir Sayı Girmelisin !__**')
  if (isNaN(silmek)) return message.reply('**__Rakam Girmelisin !__**')
  if (silmek < 0) return message.reply('**__0 dan Küçük Değer Belirtemezsin !__**')
  if(silmek > 100) return message.reply('**__100 den Büyük Değer Belirtemezsin !__**')

  
  message.channel.bulkDelete(silmek).then(() =>  {
    let embed = new Discord.MessageEmbed()
    .setDescription(`
**Silen Kişi** : **${message.author.tag}**
**Kanal : **${message.channel}
**Silinen Miktar :** **${silmek}**
`)
 message.channel.send(embed).then(message => message.delete({timeout:10000})); 

  })
  
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clear","temizle"],
  permLevel: 1
};

exports.help = {
  name: 'sil'
};