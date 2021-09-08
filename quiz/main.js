//Объявляем переменные

//варианты ответа
const option1 = document.querySelector('.option1'),
		option2 = document.querySelector('.option2'),
		option3 = document.querySelector('.option3'),
		option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

//вопрос
const question = document.getElementById('question');//сам вопрс
const numberOfQuestion = document.getElementById('number-of-question'),//номер текущего вопроса
		numberOfAllQuestions = document.getElementById('number-of-all-questions');//количество всех вопросов

let indexOfQuestion,//индекс текущего вопроса
	 indexOfPage = 0;//индекс текущей страницы

//трекер ответов
const answersTracker = document.getElementById('answers-tracker');

//кнопка Next
const btnNext = document.getElementById('btn-next');

let score = 0;//итоговый результат викторины

//модальное окно
const correctAnswer = document.getElementById('correct-answer'),
		numberOfAllQuestionsModal = document.getElementById('number-of-all-questions-modal'),
		btnTryAgain = document.getElementById('btn-try-again');

//исходные вопросы/ответы
const questions = [
	{
		question: 'Какая переменная обозначена неправильно?',
		options: [
			'let my-name',
			'let userName',
			'let test123',
			'let $'
		],
		rightAnswer: 0
	},
	{
		question: 'Какая строка создана неправильно?',
		options: [
			"let someString = 'Привет! Я строка.'",
			'let someString = "Привет! Я строка."',
			'let someString = Привет! Я строка.',
			'let someString = `Привет! Я строка.`',
		],
		rightAnswer: 2
	},
	{
		question: 'Самый универсальный метод поиска элементов в дереве DOM?',
		options: [
			'getElementById',
			'querySelectorAll',
			'querySelector',
			'getElementsBy',
		],
		rightAnswer: 1
	},
	{
		question: 'Каким способом можно указать комментарий в коде JavaScript',
		options: [
			'// комментарий',
			'/* комментарий */',
			"<-- комментарий -->",
			'/* комментарий */ и // комментарий',
		],
		rightAnswer: 3
	}
];

numberOfAllQuestions.innerHTML = questions.length;//количество всех вопрсов

//заполнение вопрос/ответ
const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];
	option4.innerHTML = questions[indexOfQuestion].options[3];

	numberOfQuestion.innerHTML = indexOfPage + 1;
	indexOfPage++;
}

//заданные вопросы
let completedAnswers = [];

//генерация вопроса
const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = false;

	if(indexOfPage == questions.length) {
		quizOver();
	} else {
		if(completedAnswers.length > 0) {
			completedAnswers.forEach(item => {
				if(item == randomNumber) {
					hitDuplicate = true;
				}
			});
			if(hitDuplicate) {
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			}
		}
		if(completedAnswers.length == 0) {
			indexOfQuestion = randomNumber;
			load();
		}
	}
	completedAnswers.push(indexOfQuestion);
}

//куда кликнул пользователь(ответ)
const checkAnswer = el => {
	if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
		el.target.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		updateAnswerTracker('wrong');
	}
	disabledOptions();
}

for(option of optionElements) {
	option.addEventListener('click', e => checkAnswer(e));
}

//блокировка повторного клика
const disabledOptions = () => {
	optionElements.forEach(item => {
		item.classList.add('disabled');
		if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
			item.classList.add('correct');
		}
	})
}

//сброс всех class
const enableOptions = () => {
	optionElements.forEach(item => {
		item.classList.remove('disabled', 'correct', 'wrong');
	})
}

//трекеры
const answerTracker = () => {
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	})
}

const updateAnswerTracker = status => {
	answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}


//ф-ция, которая не позволит пройти дальше, если не выбран ни один вариант ответа
const validate = () => {
	if(!optionElements[0].classList.contains('disabled')) {
		alert('Вам нужно выбрать один из вариантов ответа!');
	} else {
		randomQuestion();
		enableOptions();
	}
}

//ф-ция конец игры
const quizOver = () => {
	document.querySelector('.quiz-over-modal').classList.add('active');
	correctAnswer.innerHTML = score;
	numberOfAllQuestionsModal.innerHTML = questions.length;
}

const tryAgain = () => {
	window.location.reload();
}
btnTryAgain.addEventListener('click', tryAgain);

//кнопка Next
btnNext.addEventListener('click', () => {
	validate();
})

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
})










