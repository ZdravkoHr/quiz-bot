require('dotenv').config();
// Help commands
const help = require('./commands/help.js');
const categories = require('./commands/categories.js');
const difficulties = require('./commands/difficulties.js');
const scoreboard = require('./commands/scoreboard.js');

// Quiz commands
const start = require('./commands/start.js');
const stop = require('./commands/stop.js');

const Discord = require('discord.js');

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const commands = {
	help,
	categories,
	difficulties,
	scoreboard,
	start,
	stop,
};

client.on('message', msg => {
	//if (msg.channel.id !== '836561786102218772') return;
	if (globalThis.running) {
		if (msg.author.bot) return;
		addAnswer(msg);
	}

	if (msg.content[0] !== '_') return;
	const terms = msg.content.split(' ').map(term => term.trim());
	let [command, ...args] = terms;
	command = command.slice(1);
	if (!Object.keys(commands).includes(command)) {
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle('Няма такава команда');
		msg.channel.send(embed);
		return;
	}
	commands[command](msg, args || []);
});

function addAnswer(msg) {
	const hasAlreadyAnswered = globalThis.currentAnswers.find(answer => {
		return answer.author === msg.author.username;
	});
	if (hasAlreadyAnswered) return;

	console.log('global question: ', globalThis.currentQuestion);
	const wrongAnswers = globalThis.currentQuestion.incorrect_answers.map(
		answer => answer.toLowerCase()
	);

	if (
		!wrongAnswers.includes(msg.content.toLowerCase()) &&
		msg.content.toLowerCase() !==
			globalThis.currentQuestion.correct_answer.toLowerCase()
	) {
		return;
	}
	globalThis.currentAnswers.push({
		author: msg.author.username,
		answer: msg.content.toLowerCase(),
		order: globalThis.currentAnswers.length,
	});
}
