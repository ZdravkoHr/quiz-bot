const Discord = require('discord.js');
const categories = [
	'General knowledge',
	'Books',
	'Film',
	'Music',
	'Musicals & Theatres',
	'Television',
	'Video Games',
	'Board Games',
	'Science & Nature',
	'Computres',
	'Mathematics',
	'Mythology',
	'Sports',
	'Geography',
	'History',
	'Politics',
	'Art',
	'Celebrities',
	'Animals',
	'Vehicles',
	'Comics',
	'Gadgets',
	'Japanese Anime & Manga',
	'Cartoon & Animations',
];

module.exports = function (msg) {
	const embed = new Discord.MessageEmbed()
		.setColor('#fafa9e')
		.setTitle('Категории: ');

	let text = '';

	categories.forEach((category, index) => {
		text += `**#${index + 1}** - ${category} \n`;
	});

	embed.setDescription(text);
	msg.channel.send(embed);
};
