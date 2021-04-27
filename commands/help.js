const Discord = require('discord.js');
module.exports = function (msg, args) {
	const embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle('Помощ')
		.addField(
			'Как се стартира quiz?',
			'**!sq;n=count**\n count е число до 50, отговарящо на броя на въпросите. Например **!sq;n=20** ще стартира quiz с 20 въпроса.\n'
		)
		.addField(
			'Как се избира категория за quiz?',
			'**!sq;n=count;c=category**\n category е име на категория. Например **!sq;n=20;c=general knowledge** ще стартира quiz с 20 въпроса на тема general knowledge. Напишете **!categories** за списък с всички налични категории.'
		)
		.addField(
			'Как се избира ниво на сложност на въпросите за quiz?',
			'**!sq;n=count;d=level**\n level е име на сложността. Например **!sq;20;medium** ще стартира quiz с 20 въпроса със средно ниво на сложност. Напишете **!difficulties** за списък с всички налични нива на сложност.'
		)
		.addField(
			'Как се избира тип quiz?',
			'**!sq;n=count;t=type**\n type е типът quiz. Например **!sq;20;t=mc** ще стартира quiz с 20 въпроса с множество избори. Напишете **!types** за списък с всички налични типове за въпроси в quiz.'
		);
	msg.channel.send(embed);
};
