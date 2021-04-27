const Discord = require('discord.js');
const types = ['mc (Multiple Choice)', 'tf (True/False)'];

module.exports = function (msg) {
	const embed = new Discord.MessageEmbed()
		.setColor('#fafa9e')
		.setTitle('Типове quiz-и: ');

	const text = types.join('\n');

	embed.setDescription(text);
	msg.channel.send(embed);
};
