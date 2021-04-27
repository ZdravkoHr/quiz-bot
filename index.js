require('dotenv').config();
const help = require('./commands/help.js');
const Discord = require('discord.js');

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const commands = {
	help,
};

client.on('message', msg => {
	if (msg.channel.id !== '836561786102218772') return;
	if (msg.content[0] !== '!') return;
	const terms = msg.content.split(';').map(term => term.trim());
	const [command, args] = terms;
	commands[command.slice(1)](msg, args);
});
