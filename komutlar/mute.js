const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;

var mutelirolu = "CEZALI"; 

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.reply(`**__Bunu yapabilmek için gerekli yetkiye sahip değilsiniz !__**`);
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if (!mutekisi)
    return message.reply(
      `**__Lütfen bir kullanıcı etiketleyiniz !__** \n**Doğru Kullanım;** **${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g> Sebep**`
    );
  if (mutekisi.hasPermission("MANAGE_MESSAGES"))
    return message.reply(
      `**__Yetkili bir kişiyi muteleyemem !__** \n**Doğru Kullanım;** \`**${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g> Sebep**\``
    );
  let sebep = args.splice(2, args.length).join(" ");
  let muterol = message.guild.roles.cache.find(role => role.name == mutelirolu);
  if (!muterol) {
    try {
      muterol = await message.guild.roles.create({
        name: mutelirolu,
        color: "#313136",
        permissions: [],
        reason: 'Mute için!'
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.createOverwrite(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
    .replace(`sn`, `s`)
    .replace(`dk`, `m`)
    .replace(`sa`, `h`)
    .replace(`g`, `d`);

  if (!mutezaman) return message.reply(`**__Lütfen bir zaman giriniz !__** \n**Doğru Kullanım;** \`**${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g> Sebep**\``);

  await mutekisi.roles.add(muterol.id);
  message.channel.send(
    new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setColor(0x00ae86)
    .setAuthor("İşlem : Mute")
    .setTimestamp()
    .addField("**Kullanıcı:**", `<@${mutekisi.id}>`)
    .addField("**Moderatör:**", message.author)
    .addField("**Süre:**", args[1])
    .addField("**Sebep:**", `${sebep === "" ? "Sebep belirtilmemiş." : sebep}`)
    .setFooter("Muhammedciks", bot.user.avatarURL())
  );

  setTimeout(function() {
    mutekisi.roles.remove(muterol.id);
    message.channel.send(`**<@${mutekisi.id}> __kullanıcısının mutelenme süresi sona erdi !__**`);
  }, ms(mutezaman));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tempmute"],
  permLevel: 0
};

exports.help = {
  name: "mute",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
  usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
};