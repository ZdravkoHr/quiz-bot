const { MessageEmbed } = require('discord.js');
const showScoreboard = require('./scoreboard.js');
const fetch = require('node-fetch');

globalThis.running = false;
globalThis.currentQuestion = null;
globalThis.currentAnswers = [];
globalThis.questions = [];
globalThis.scoreBoard = {};

module.exports = async function (msg, args) {
	if (globalThis.running) {
		const embed = new MessageEmbed()
			.setColor('#ff0000')
			.setTitle('В момента се провежда quiz. За да го спрете, напишете !stop');
		msg.channel.send(embed);
		return;
	}

	globalThis.running = true;
	globalThis.scoreBoard = {};

	const embed = new MessageEmbed()
		.setColor('#00ff00')
		.setTitle('Quiz-ът беше стартиран.');
	msg.channel.send(embed);

	const params = getParams(args);
	globalThis.questions = await getQuestions(params);

	let index = 0;

	askQuestion(msg, questions, index);
	index++;

	if (index === globalThis.questions.length) {
		endGame(msg);
		return;
	}

	globalThis.interval = await setInterval(() => {
		if (index === globalThis.questions.length) {
			clearInterval(globalThis.interval);
			endGame(msg);
			return;
		}
		askQuestion(msg, questions, index);
		index++;
	}, 30000);
};

function askQuestion(msg, questions, index) {
	globalThis.currentQuestion = questions[index];
	console.log(globalThis.currentQuestion);
	globalThis.currentAnswers = [];
	printQuestion(msg, globalThis.currentQuestion, index);

	globalThis.timeout = setTimeout(() => {
		const answerEmbed = new MessageEmbed().setTitle(
			'Правилният отговор е: ' + globalThis.currentQuestion.correct_answer
		);

		const givenAnswers = globalThis.currentAnswers.filter(answer => {
			return (
				answer.answer ===
				globalThis.currentQuestion.correct_answer.toLowerCase()
			);
		});

		if (!givenAnswers.length) {
			answerEmbed
				.setColor('#ffc0cb')
				.setDescription('Никой не успя да отговори правилно.');
			msg.channel.send(answerEmbed);
			return;
		}

		const firstAnswer = givenAnswers.sort((a, b) => b.order - a.order)[0];
		let description = `${firstAnswer.author} успя да отговори вярно на въпроса най-бързо и затова получава 2 точки. \n`;
		addScore(firstAnswer.author, 2);
		if (givenAnswers.length === 2) {
			description += `${givenAnswers[1].author} също отговори вярно на въпроса, но по-бавно, затова получава 1 точка.`;
			addScore(givenAnswers[1].author, 1);
		} else if (givenAnswers.length > 2) {
			const names = givenAnswers.slice(1).map(answer => answer.author);
			description += `${names.join(
				', '
			)} също отговориха вярно на въпроса, но по-бавно, затова получават 1 точка.`;

			names.forEach(name => {
				addScore(name, 1);
			});
		}

		answerEmbed.setDescription(description);
		msg.channel.send(answerEmbed);
	}, 25000);
}

function addScore(name, toAdd = 1) {
	globalThis.scoreBoard[name] = (globalThis.scoreBoard[name] || 0) + toAdd;
}

function endGame(msg) {
	globalThis.running = false;
	showScoreboard(msg);
}

function printQuestion(msg, question, number) {
	question.question = replaceSymbols(question.question);
	const embed = new MessageEmbed().setTitle(
		`Въпрос № ${number + 1} от ${globalThis.questions.length} \n \n ${
			question.question
		}`
	);
	addAnswers(embed, question);
	msg.channel.send(embed);
}

function replaceSymbols(string) {
	return string
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&pi;/g, 'π')
		.replace(/&ntilde;/g, 'n')
		.replace(/&aacute;/g, 'a')
		.replace(/&eacute;/g, 'e')
		.replace(/&oacute;/g, 'o')
		.replace(/&iacute;/g, 'i');
}

function addAnswers(embed, question) {
	const answers = generateAnswers(question).map(replaceSymbols);
	let description = answers.join('\n');
	embed.setDescription(description);
}

function generateAnswers(question) {
	globalThis.currentQuestion.correct_answer = replaceSymbols(
		globalThis.currentQuestion.correct_answer
	);
	const answers = [...question.incorrect_answers];
	const randomNum = Math.floor(Math.random() * answers.length);
	answers.splice(randomNum, 0, question.correct_answer);
	return answers;
}

async function getQuestions(params) {
	let url = `https://opentdb.com/api.php?amount=${params.n}`;

	if (params.c) {
		if (+params.c < 1 || +params.c > 24) return;

		url += `&category=${+params.c + 8}`;
	}

	if (params.d) {
		if (globalThis.difficulties.includes(params.d)) {
			url += `&difficulty=${params.d}`;
		}
	}

	const response = await fetch(url);
	const json = await response.json();
	return json.results;
}

function getParams(args) {
	const obtainParam = findParam(args);
	const params = {
		n: obtainParam('n') || 5,
		c: obtainParam('c') || null,
		d: obtainParam('d') || null,
	};

	return params;
}

function findParam(args) {
	return function (toFind) {
		if (!args.length) return;

		const found = args.find(term => {
			const [param] = term.split('=');
			return param === toFind;
		});

		return found ? found.split('=')[1] : null;
	};
}
