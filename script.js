const questions = [
  {
    title: "1. Pregunta 1`?",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["OPCION A", "OPCION B", "OPCION C", "OPCION D"],
    correct: "OPCION A",
    photo: "assets/momento.jpg",
    momentTitle: "TITULO",
    momentCaption: "DESCP FOTO",
  },
  {
    title: "2. PREGUNTA 2",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["OPCION A", "OPCION B", "OPCION C", "OPCION D"],
    correct: "OPCION A",
    photo: "assets/momento.jpg",
    momentTitle: "TITULO",
    momentCaption: "DESCP FOTO",
  },
  {
    title: "3. PREGUNTA 3",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["OPCION A", "OPCION B", "OPCION C", "OPCION D"],
    correct: "OPCION A",
    photo: "assets/momento.jpg",
    momentTitle: "TITULO",
    momentCaption: "DESCP FOTO",
  },
  {
    title: "4. PREGUNTA 4",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["OPCION A", "OPCION B", "OPCION C", "OPCION D"],
    correct: "OPCION A",
    photo: "assets/momento.jpg",
    momentTitle: "TITULO",
    momentCaption: "DESCP FOTO",
  },
  {
    title: "5. PREGUNTA 5",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["OPCION A", "OPCION B", "OPCION C", "OPCION D"],
    correct: "OPCION A",
    photo: "assets/momento.jpg",
    momentTitle: "TITULO",
    momentCaption: "DESCP FOTO",
  },
];

let currentQuestion = 0;

const DATE_PHOTO_1_SRC = "assets/fecha-1.jpg";
const DATE_PHOTO_2_SRC = "assets/fecha-2.jpg";
const DATE_PHOTO_FALLBACK_SRC = "assets/nosotros.jpg";
const MEMORY_VIDEO_SRC = "https://www.youtube-nocookie.com/embed/JGwWNGJdvx8";

const stepIndicator = document.getElementById("step-indicator");
const questionTitle = document.getElementById("question-title");
const questionSubtitle = document.getElementById("question-subtitle");
const questionActions = document.getElementById("question-actions");
const answerFeedback = document.getElementById("answer-feedback");
const momentCard = document.getElementById("moment-card");
const momentTitle = document.getElementById("moment-title");
const momentPhoto = document.getElementById("moment-photo");
const momentCaption = document.getElementById("moment-caption");
const nextBtn = document.getElementById("next-btn");

const quizCard = document.getElementById("quiz-card");
const specialDateCard = document.getElementById("special-date-card");
const videoCard = document.getElementById("video-card");
const datePhoto1 = document.getElementById("date-photo-1");
const datePhoto2 = document.getElementById("date-photo-2");
const continueToVideoBtn = document.getElementById("continue-to-video");
const memoryVideo = document.getElementById("memory-video");

function setupDatePhotos() {
  const datePhotos = [
    { element: datePhoto1, src: DATE_PHOTO_1_SRC },
    { element: datePhoto2, src: DATE_PHOTO_2_SRC },
  ];

  datePhotos.forEach(({ element, src }) => {
    if (!element) return;
    element.src = src;
    element.addEventListener("error", () => {
      if (element.src.includes(DATE_PHOTO_FALLBACK_SRC)) return;
      element.src = DATE_PHOTO_FALLBACK_SRC;
    });
  });
}

function setupMemoryVideo() {
  if (!memoryVideo) return;
  memoryVideo.src = MEMORY_VIDEO_SRC;
}

function renderQuestion() {
  const q = questions[currentQuestion];

  stepIndicator.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  questionTitle.textContent = q.title;
  questionSubtitle.textContent = q.subtitle;
  answerFeedback.textContent = "";
  answerFeedback.className = "answer-feedback";
  momentCard.classList.add("hidden");

  questionActions.innerHTML = "";

  q.options.forEach((label) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.textContent = label;
    btn.addEventListener("click", () => evaluateAnswer(label));
    questionActions.appendChild(btn);
  });
}

function evaluateAnswer(selectedOption) {
  const q = questions[currentQuestion];

  if (selectedOption !== q.correct) {
    answerFeedback.textContent = "Casi... puedes volver a intentarlo.";
    answerFeedback.className = "answer-feedback error";
    return;
  }

  if (currentQuestion === questions.length - 1) {
    quizCard.classList.add("hidden");
    specialDateCard.classList.remove("hidden");
    return;
  }

  answerFeedback.textContent = "Bien! Acertaste.";
  answerFeedback.className = "answer-feedback success";
  questionActions.innerHTML = "";
  momentTitle.textContent = q.momentTitle;
  momentPhoto.src = q.photo;
  momentCaption.textContent = q.momentCaption;
  momentCard.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion += 1;
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);

if (continueToVideoBtn) {
  continueToVideoBtn.addEventListener("click", () => {
    specialDateCard.classList.add("hidden");
    videoCard.classList.remove("hidden");
  });
}

setupDatePhotos();
setupMemoryVideo();
renderQuestion();
