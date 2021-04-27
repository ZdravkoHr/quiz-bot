const Discord = require('discord.js');
const difficulties = ['easy', 'medium', 'hard'];

module.exports = function (msg) {
	const embed = new Discord.MessageEmbed()
		.setColor('#fafa9e')
		.setTitle('Нива на трудност: ');

	const text = difficulties.join('\n');

	embed.setDescription(text);
	msg.channel.send(embed);
};
