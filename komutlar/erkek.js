const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("xd", "Özelden işlemiyorum canım");
    return message.channel.send(ozelmesajuyari);
  }
  if (
    !message.member.roles.cache.has("967893672572117002") &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Yetersiz yetki")
        .setColor("Black")
    );

  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Bir üye etiketlemelisin!")
        .setColor("Black")
    );
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  let isim = args[1];
  if (!isim) return message.channel.send("Lütfen bir isim girin!");
  //.then((m) => m.delete(5000));
  let yas = args[2];
  if (!yas) return message.channel.send("Lütfen bir yaş girin!");
  await member.setNickname(` ${isim} | ${yas}`);
  member.roles.add("967584855099600937"); //erkek rol id
  member.roles.add("967893671703879750"); //kayıtlı ID
  member.roles.remove("967584857184153610"); //kayıtsız rol id
  message.react("<:onay:970242056100392970>");

  //  message.react("967941286688595978"); //Emojiid
  const kanal = message.guild.channels.cache.find(
    (c) => c.id == "970242561484681236" // log kanal ıd
  ); //LOGİD
  const embed1 = new Discord.MessageEmbed()
    .addField(
      `Kayıt Log`,
      ` Kayıt yapılan kişi: ${member.user} 
      
        Kayıt Yapan yetkili: <@${message.author.id}>

        Verilen Rol: <@&967584855099600937>

      Toplam: ${member.guild.memberCount} kişi olduk`
    )
    .setDescription("**Bir kayıt yapıldı**")
    .setColor("RED")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .addField(
      `Kayıt Sistemi`,
      `<:onay:970242056100392970> ${member.user} **adlı üyeye** <@&967584855099600937> **rolünü verip ismini**  \` ${isim} | ${yas}\` **olarak ayarladım!**`
    )
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  return message.channel.send(embed).then(kanal.send(embed1));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["erkek", "e"],
  kategori: "Kayıt",
  //permLevel: 0,
};
exports.help = {
  name: "Erkek",
  description: "erkek kayıt yapar",
  usage: "Erkek <isim> <yaş>",
};
