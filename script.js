const quizData = [
  {
    question: ' 1 - 4 다음을 듣고 <보기>와 같이 물음에 맞는 대답을 고르십시오 \n보 기',
    options: ['네，학생이에요.', '네，학생이 없어요.', '아니요，학생이 와요', '아니요，학생이 많아요.'],
    answer: '네，학생이에요.',
  },
  {
    question: '2.',
    options: ['네，책을 싫어해요', '네，책이 아니에요', '아니요，책이 있어요', '아니요，책을 안 읽어요.'],
    answer: '아니요，책을 안 읽어요.',
  },
  {
    question: '3.',
    options: ['지금 해요.', '우리가 해요.', '카페에서 해요.', '동생하고 해요.'],
    answer: '카페에서 해요.',
  },
  {
    question: '4.',
    options: ['어제 갔어요.', '자주 갔어요.', '친구가 갔어요.', '지하철로 갔어요.'],
    answer: '지하철로 갔어요.',
  },
  {
    question: '5.',
    options: ['축하해요.',
      '아니에요.',
      '고마워요.',
      '반가워요.',
    ],
    answer: '아니에요.',
  },
  {
    question: '6.',
    options: ['잘 먹겠습니다', '잘 지냈습니다', '네. 알겠습니다', '네. 그렇습니다'],
    answer: '네. 알겠습니다',
  },
  {
    question: '7.',
    options: [
      '꽃집.',
      '극장.',
      '학교.',
      '시장.',
    ],
    answer: '시장.',
  },
  {
    question: '8.',
    options: ['은행s', '식당', '도서관', '문구점'],
    answer: '식당',
  },
  {
    question: '9.',
    options: [
      '백화점',
      '여행사',
      '우체국',
      '박물관',
    ],
    answer: '백화점',
  },
  {
    question: '10.',
    options: ['서점', '약국', '미용실', '사진관'],
    answer: '약국',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function playAudio() {
  var audio = document.getElementById("myAudio");
  audio.play();
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score*5} out of ${quizData.length*5}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score*5} out of ${quizData.length*5}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();                                            