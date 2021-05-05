const { MessageEmbed } = require('discord.js');

module.exports = function (msg) {
	if (!globalThis.running) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('В момента не се провежда quiz');

		msg.channel.send(embed);
		return;
	}
	globalThis.running = false;
	clearTimeout(globalThis.timeout);
	clearInterval(globalThis.interval);
	const embed = new MessageEmbed()
		.setColor('#00ff00')
		.setTitle('Quiz-ът беше спрян.');
	msg.channel.send(embed);
};
