const questions = [
  {
    title: "1. Que dia sacamos nuestra primera foto juntos?",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["20 de marzo", "10 de enero", "14 de febrero", "20 de febrero"],
    correct: "14 de febrero",
    photo: "assets/momentos-1.jpg",
    momentTitle: "Nuestra primera foto juntos",
    momentCaption: "La primera de muchas por sacar juntos.",
  },
  {
    title: "2. Quien se enojo el dia que fuimos al sushi libre?",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: [ "Lenchus","Fran", "Ambas son correctas", "Ninguna es correcta"],
    correct: "Fran",
    photo: "assets/momentos-2.jpg",
    momentTitle: "El dia del sushi libre",
    momentCaption: "Pero siempre terminamos con una sonrisa.",
  },
  {
    title: "3. Sabes lo mucho que te amamos, el perrito .... y yo",
    subtitle: "Que nombre completa la frase.",
    options: ["Zombie", "Firulais", "Mora"],
    correct: "Zombie",
    photo: "assets/momentos-3.jpg",
    momentTitle: "Nuestro perrito querido",
    momentCaption: "Siempre nos acompaña en nuestras aventuras.",
  },
  {
    title: "4. Sabes que siempre estoy listo para hacer la comida que mas te gusta ...",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["Pastas", "Pizza", "Milanesas","Asadito"],
    correct: "Asadito",
    photo: "assets/momentos-4.jpg",
    momentTitle: "Nuestra comida favorita",
    momentCaption: "Siempre disfruto prepararla para vos.",
  },
  {
    title: "5. Que dia se cortan el pelo los infieles segun vos?  ",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["Sabado", "Martes", "Jueves", "Viernes"],
    correct: "Viernes",
    photo: "assets/momentos-5.jpg",
    momentTitle: "Pero yo me siento asi con el pelo corto esperando por vernos",
    momentCaption: "Siempre me esfuerzo por verte feliz.",
  },
  {
    title: "6. Cual es nuestra panaderia preferida?",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["Acequia", "Pertuti", "Bakery", "Suevia"],
    correct: "Acequia",
    photo: "assets/momentos-6.jpg",
    momentTitle: "Nuestra panaderia preferida",
    momentCaption: "Y obvio, siempre elegimos Acequia.",
  },
];

let currentQuestion = 0;

const DATE_PHOTO_1_SRC = "assets/fecha-1.jpg";
const DATE_PHOTO_2_SRC = "assets/fecha-2.jpg";
const DATE_PHOTO_FALLBACK_SRC = "assets/nosotros.jpg";
const MEMORY_VIDEO_SRC = "assets/videofinal.mp4";
const THANKS_PHOTO_SRC = "assets/gracias.jpg";
const THANKS_PHOTO_FALLBACK_SRC = "assets/nosotros.jpeg";
const ENDING_PHOTO_SRC = "assets/nosotros.jpeg";
const ENDING_PHOTO_FALLBACK_SRC = "assets/nosotros.jpeg";
const FINAL_QUESTION_PHOTO_SRC = "assets/preguntaFinal.jpeg";
const FINAL_QUESTION_PHOTO_FALLBACK_SRC = "assets/nosotros.jpeg";
const FINAL_QUESTION_CORRECT_ANSWER = "carilo";

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
const thanksCard = document.getElementById("thanks-card");
const thanksPhoto = document.getElementById("thanks-photo");
const continueAfterThanksBtn = document.getElementById("continue-after-thanks");
const endingCard = document.getElementById("ending-card");
const endingPhoto = document.getElementById("ending-photo");
const goToFinalQuestionBtn = document.getElementById("go-to-final-question");
const finalQuestionCard = document.getElementById("final-question-card");
const finalQuestionPhoto = document.getElementById("final-question-photo");
const finalAnswerInput = document.getElementById("final-answer-input");
const checkFinalAnswerBtn = document.getElementById("check-final-answer");
const finalAnswerFeedback = document.getElementById("final-answer-feedback");
const specialDateCard = document.getElementById("special-date-card");
const videoCard = document.getElementById("video-card");
const datePhoto1 = document.getElementById("date-photo-1");
const datePhoto2 = document.getElementById("date-photo-2");
const continueToVideoBtn = document.getElementById("continue-to-video");
const memoryVideo = document.getElementById("memory-video");

function setStage(stage) {
  document.body.dataset.stage = stage;
}

function triggerScreenEnter(card) {
  if (!card) return;
  card.classList.remove("screen-enter");
  // Force reflow so the animation can restart each time.
  void card.offsetWidth;
  card.classList.add("screen-enter");
}

function triggerPhotoReveal(img) {
  if (!img) return;
  img.classList.remove("photo-reveal");
  void img.offsetWidth;
  img.classList.add("photo-reveal");
}

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

function setupEndingPhoto() {
  if (!endingPhoto) return;
  endingPhoto.src = ENDING_PHOTO_SRC;
  endingPhoto.addEventListener("load", () => triggerPhotoReveal(endingPhoto));
  endingPhoto.addEventListener("error", () => {
    if (endingPhoto.src.includes(ENDING_PHOTO_FALLBACK_SRC)) return;
    endingPhoto.src = ENDING_PHOTO_FALLBACK_SRC;
  });
}

function setupThanksPhoto() {
  if (!thanksPhoto) return;
  thanksPhoto.src = THANKS_PHOTO_SRC;
  thanksPhoto.addEventListener("load", () => triggerPhotoReveal(thanksPhoto));
  thanksPhoto.addEventListener("error", () => {
    if (thanksPhoto.src.includes(THANKS_PHOTO_FALLBACK_SRC)) return;
    thanksPhoto.src = THANKS_PHOTO_FALLBACK_SRC;
  });
}

function showPostQuizFlow() {
  if (thanksCard) thanksCard.classList.add("hidden");
  if (endingCard) {
    endingCard.classList.remove("hidden");
    triggerScreenEnter(endingCard);
    triggerPhotoReveal(endingPhoto);
    setStage("ending");
  } else {
    specialDateCard.classList.remove("hidden");
    triggerScreenEnter(specialDateCard);
    setStage("video");
  }
}

function setupFinalQuestionPhoto() {
  if (!finalQuestionPhoto) return;
  finalQuestionPhoto.src = FINAL_QUESTION_PHOTO_SRC;
  finalQuestionPhoto.addEventListener("load", () => triggerPhotoReveal(finalQuestionPhoto));
  finalQuestionPhoto.addEventListener("error", () => {
    if (finalQuestionPhoto.src.includes(FINAL_QUESTION_PHOTO_FALLBACK_SRC)) return;
    finalQuestionPhoto.src = FINAL_QUESTION_PHOTO_FALLBACK_SRC;
  });
}

function showVideoCard() {
  if (finalQuestionCard) finalQuestionCard.classList.add("hidden");
  if (specialDateCard) specialDateCard.classList.add("hidden");
  if (videoCard) {
    videoCard.classList.remove("hidden");
    triggerScreenEnter(videoCard);
    setStage("video");
  }
}

function evaluateFinalAnswer() {
  if (!finalAnswerInput || !finalAnswerFeedback) return;

  const normalized = finalAnswerInput.value.trim().toLowerCase();
  if (normalized !== FINAL_QUESTION_CORRECT_ANSWER) {
    finalAnswerFeedback.textContent = "Casi... intenta de nuevo.";
    finalAnswerFeedback.className = "answer-feedback error";
    return;
  }

  finalAnswerFeedback.textContent = "Felicitaciones! Respuesta correcta.";
  finalAnswerFeedback.className = "answer-feedback success";

  setTimeout(() => {
    showVideoCard();
  }, 700);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  setStage("quiz");

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

  answerFeedback.textContent = "Bien! Acertaste.";
  answerFeedback.className = "answer-feedback success";
  questionActions.innerHTML = "";
  momentTitle.textContent = q.momentTitle;
  momentPhoto.src = q.photo;
  momentCaption.textContent = q.momentCaption;
  momentCard.classList.remove("hidden");
  triggerScreenEnter(momentCard);
  triggerPhotoReveal(momentPhoto);
  setStage("moment");
}

function nextQuestion() {
  if (currentQuestion === questions.length - 1) {
    quizCard.classList.add("hidden");
    if (thanksCard) {
      thanksCard.classList.remove("hidden");
      triggerScreenEnter(thanksCard);
      triggerPhotoReveal(thanksPhoto);
      setStage("thanks");
    } else {
      showPostQuizFlow();
    }
    return;
  }

  currentQuestion += 1;
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);

if (continueAfterThanksBtn) {
  continueAfterThanksBtn.addEventListener("click", showPostQuizFlow);
}

if (continueToVideoBtn) {
  continueToVideoBtn.addEventListener("click", () => {
    specialDateCard.classList.add("hidden");
    videoCard.classList.remove("hidden");
    triggerScreenEnter(videoCard);
    setStage("video");
  });
}

if (goToFinalQuestionBtn) {
  goToFinalQuestionBtn.addEventListener("click", () => {
    if (endingCard) endingCard.classList.add("hidden");
    if (finalQuestionCard) {
      finalQuestionCard.classList.remove("hidden");
      triggerScreenEnter(finalQuestionCard);
      triggerPhotoReveal(finalQuestionPhoto);
      setStage("final-question");
    }
    if (finalAnswerInput) {
      finalAnswerInput.value = "";
      finalAnswerInput.focus();
    }
    if (finalAnswerFeedback) {
      finalAnswerFeedback.textContent = "";
      finalAnswerFeedback.className = "answer-feedback";
    }
  });
}

if (checkFinalAnswerBtn) {
  checkFinalAnswerBtn.addEventListener("click", evaluateFinalAnswer);
}

if (finalAnswerInput) {
  finalAnswerInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      evaluateFinalAnswer();
    }
  });
}

setupDatePhotos();
setupMemoryVideo();
setupThanksPhoto();
setupEndingPhoto();
setupFinalQuestionPhoto();
setStage("quiz");
renderQuestion();
