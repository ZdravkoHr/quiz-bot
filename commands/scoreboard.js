const { MessageEmbed } = require('discord.js');

module.exports = function (msg) {
	const scoreEmbed = new MessageEmbed()
		.setColor('#FFA500')
		.setTitle('Scoreboard');
	let description = Object.entries(globalThis.scoreBoard)
		.sort((a, b) => b[1] - a[1])
		.map(score => `${score[0]} => ${score[1]}`)
		.join('\n');
	scoreEmbed.setDescription(description);
	msg.channel.send(scoreEmbed);
};
