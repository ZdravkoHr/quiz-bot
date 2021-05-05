const Discord = require('discord.js');
module.exports = function (msg) {
	const embed = new Discord.MessageEmbed()
		.setColor('#fafa9e')
		.setTitle('Помощ')
		.addField(
			'Как се стартира quiz?',
			'**_start n=count**\n count е число до 50, отговарящо на броя на въпросите. Например **_sstart n=20** ще стартира quiz с 20 въпроса.\n'
		)
		.addField(
			'Как се избира категория за quiz?',
			'**_start n=count c=category**\n category е номер на категория. Например **_start n=20 c=1** ще стартира quiz с 20 въпроса на тема general knowledge. Напишете **_categories** за списък с всички налични категории.'
		)
		.addField(
			'Как се избира ниво на сложност на въпросите за quiz?',
			'**_start n=count d=level**\n level е име на сложността. Например **_start 20 medium** ще стартира quiz с 20 въпроса със средно ниво на сложност. Напишете **_difficulties** за списък с всички налични нива на сложност.'
		);
	msg.channel.send(embed);
};
