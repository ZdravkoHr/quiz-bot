const Discord = require('discord.js');
const fetch = require('node-fetch');

let running = false;

module.exports = async function (msg, args) {
	if (running) {
		msg.channel.send(
			'В момента се провежда quiz. За да го спрете, напишете !stop'
		);
		return;
	}

	msg.channel.send('Quiz-ът е стартиран!');

	const params = getParams(args);
	const questions = await getQuestions(params);
};

async function getQuestions(params) {
	const url = `https://opentdb.com/api.php?amount=${params.n}`;

	if (params.c) {
		const categoryIndex = categories.findIndex(params.c);
		url += `&category=${categoryIndex + 8}`;
	}

	if (params.d) {
		const difficultyIndex = difficulties.findIndex(params.d);
		url += `&difficulty=${params.d}`;
	}

	const response = await fetch(url);
	const json = await response.json();
	console.log(json);
}

function getParams(args) {
	const params = {
		n: findParam('n') || 10,
		d: findParam('d') || null,
		t: findParam('t') || null,
	};

	return params;
}

function findParam(args, toFind) {
	console.log(args);
	return args
		.find(term => {
			const [param] = term.split('=');
			return param === toFind;
		})
		.split('=')[1];
}
