const questions = [
  {
    question: "What is a common Tamil festival that celebrates lights and togetherness?",
    options: ["Diwali", "Pongal", "Onam", "Holi"],
    answer: "Pongal",
    explanation: "Pongal is a joyful Tamil harvest festival celebrated with family, sweet dishes, and colorful traditions."
  },
  {
    question: "Which dish is a famous South Indian rice dish often served with sambar and chutney?",
    options: ["Pizza", "Dosa", "Burger", "Pasta"],
    answer: "Dosa",
    explanation: "Dosa is a thin, crispy rice-and-lentil crepe that is loved across India."
  },
  {
    question: "What is a kolam?",
    options: ["A type of drum", "A decorative floor pattern", "A festival song", "A temple bell"],
    answer: "A decorative floor pattern",
    explanation: "A kolam is a beautiful geometric design drawn at the doorstep, often with rice flour."
  },
  {
    question: "Which Tamil greeting means 'Hello' in a warm, friendly way?",
    options: ["Vanakkam", "Shalom", "Aloha", "Bonjour"],
    answer: "Vanakkam",
    explanation: "Vanakkam is a common Tamil greeting used to welcome people warmly."
  },
  {
    question: "What is the traditional Tamil greeting often used before meals?",
    options: ["Cheers", "Pranam", "Bon appétit", "Ayo"],
    answer: "Pranam",
    explanation: "Pranam is a respectful greeting used in many Indian cultures and can be shared with kindness."
  },
  {
    question: "Which item is commonly offered at a Tamil temple as a sign of devotion?",
    options: ["Coffee beans", "Flowers", "Toys", "Books"],
    answer: "Flowers",
    explanation: "Flowers are a common offering in temples as a symbol of devotion and respect."
  },
  {
    question: "What is a popular Tamil sweet made with rice, jaggery, and milk?",
    options: ["Kheer", "Payasam", "Tiramisu", "Cake"],
    answer: "Payasam",
    explanation: "Payasam is a creamy, festive dessert enjoyed in Tamil homes during celebrations."
  },
  {
    question: "Which practice is often seen in Tamil homes as a sign of good wishes?",
    options: ["Skipping breakfast", "Drawing a kolam at the doorway", "Washing shoes indoors", "Sleeping early"],
    answer: "Drawing a kolam at the doorway",
    explanation: "A kolam at the doorway is a welcoming symbol of beauty, order, and good fortune."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const questionNumberEl = document.getElementById("question-number");
const nextBtn = document.getElementById("nextBtn");

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;
  questionNumberEl.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
  scoreEl.textContent = score;
  feedbackEl.textContent = "";
  answersEl.innerHTML = "";
  nextBtn.hidden = true;
  answered = false;

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.type = "button";
    button.addEventListener("click", () => handleAnswer(button, option));
    answersEl.appendChild(button);
  });
}

function handleAnswer(button, pickedOption) {
  if (answered) return;

  answered = true;
  const correctAnswer = questions[currentQuestionIndex].answer;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
    if (btn.textContent === pickedOption && pickedOption !== correctAnswer) {
      btn.classList.add("wrong");
    }
  });

  if (pickedOption === correctAnswer) {
    score += 10;
    scoreEl.textContent = score;
    feedbackEl.textContent = "Correct! Great job!";
  } else {
    feedbackEl.textContent = `Not quite. ${questions[currentQuestionIndex].explanation}`;
  }

  nextBtn.hidden = false;
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Play Again" : "Next Question";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
  }
});

renderQuestion();
