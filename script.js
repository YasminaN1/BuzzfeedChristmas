

/* ---------- QUESTIONS ---------- */
const questions = [
  {
    text: "What Energy Does Your House Give Off?",
    options: [
      { img: "imgs/mutedhouse.png", type: "cozy" },
      { img: "imgs/festivehouse.png", type: "classic" },
      { img: "imgs/eleganthouse.png", type: "fun" },
      { img: "imgs/cozycabinhouse.png", type: "romantic" }
    ]
  },
  {
    text: "How Decorated Is Your Living Room for Christmas?",
    options: [
      { img: "imgs/unfestivelivingroom.png", type: "fun" },
      { img: "imgs/tackylivingroom.png", type: "cozy" },
      { img: "imgs/sterilelivingroom.png", type: "classic" },
      { img: "imgs/cozylivingroom.png", type: "romantic" }
    ]
  },
  {
    text: "What Does Your Kitchen Look Like During Christmas?",
    options: [
      { img: "imgs/whitekitchen.png", type: "classic" },
      { img: "imgs/warmkitchen.png", type: "cozy" },
      { img: "imgs/messykitchen.png", type: "fun" },
      { img: "imgs/nospirit.png", type: "romantic" }
    ]
  },
  {
    text: "How Decorated Is Your Bedroom During Christmas?",
    options: [
      { img: "imgs/whitebed.png", type: "cozy" },
      { img: "imgs/undecoratedbed.png", type: "classic" },
      { img: "imgs/pinkbed.png", type: "fun" },
      { img: "imgs/festivebed.png", type: "romantic" }
    ]
  },
  {
    text: "What Does Your Tree Look Like?",
    options: [
      { img: "imgs/realtree.png", type: "romantic" },
      { img: "imgs/grandtree.png", type: "cozy" },
      { img: "imgs/faketree.png", type: "classic" },
      { img: "imgs/babytree.png", type: "fun" }
    ]
  },
  {
    text: "What Does Your Bathroom Look Like?",
    options: [
      { img: "imgs/warmbathroom.png", type: "cozy" },
      { img: "imgs/tackybathroom.png", type: "fun" },
      { img: "imgs/sterilebathroom.png", type: "classic" },
      { img: "imgs/elegantbathroom.png", type: "romantic" }
    ]
  },
  {
    text: "What Does Your Christmas Table Look Like?",
    options: [
      { img: "imgs/takeout.png", type: "romantic" },
      { img: "imgs/superfeast.png", type: "fun" },
      { img: "imgs/superelegantfeast.png", type: "classic" },
      { img: "imgs/simplefeast.png", type: "cozy" }
    ]
  },
  {
    text: "What’s Your Holiday Lighting Vibe?",
    options: [
      { img: "imgs/tackylighting.png", type: "classic" },
      { img: "imgs/nolighting.png", type: "cozy" },
      { img: "imgs/insanelighting.png", type: "fun" },
      { img: "imgs/elegantlighting.png", type: "romantic" }
    ]
  }
];

/* ---------- SONG RESULTS ---------- */
const songResults = {
  cozy: {
    title: "It's Beginning To Look A Lot Like Christmas",
    description: "Soft, warm, and nostalgic",
    cover: "imgs/cozy-album.png"
  },
  classic: {
    title: "White Christmas",
    description: "Timeless and traditional",
    cover: "imgs/classic-album.png"
  },
  fun: {
    title: "Rockin’ Around the Christmas Tree",
    description: "Energetic and festive",
    cover: "imgs/fun-album.png"
  },
  romantic: {
    title: "All I Want For Christmas Is You",
    description: "Emotional and dreamy",
    cover: "imgs/romantic-album.png"
  }
};

/* ---------- AUDIO MAP ---------- */
const audioMap = {
  cozy: "audio/its-beginning.mp3",
  classic: "audio/white-christmas.mp3",
  fun: "audio/rockin-around.mp3",
  romantic: "audio/mariah-all-i-want.mp3"
};

/* ---------- STATE ---------- */
let currentQuestion = 0;
let answers = [];

/* ---------- ELEMENTS ---------- */
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const questionText = document.getElementById("question-text");
const optionsGrid = document.getElementById("options-grid");
const songTitleEl = document.getElementById("song-title");
const songDescEl = document.getElementById("song-description");
const coverEl = document.getElementById("cover");
const audioEl = document.getElementById("result-audio");
const vinyl = document.getElementById("vinyl");

/* ---------- LOAD QUESTION ---------- */
function loadQuestion() {
  questionText.textContent = questions[currentQuestion].text;
  optionsGrid.innerHTML = "";

  questions[currentQuestion].options.forEach(option => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `<img src="${option.img}" alt="">`;
    div.addEventListener("click", () => selectOption(option.type));
    optionsGrid.appendChild(div);
  });
}

/* ---------- SELECT OPTION ---------- */
function selectOption(type) {
  answers.push(type);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult(true);
  }
}

/* ---------- SHOW RESULT ---------- */
function showResult(autoplay = false) {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  const counts = {};
  answers.forEach(t => counts[t] = (counts[t] || 0) + 1);

  const winningType = Object.keys(counts).reduce((a, b) =>
    counts[a] >= counts[b] ? a : b
  );

  const song = songResults[winningType];

  songTitleEl.textContent = song.title;
  songDescEl.textContent = song.description;
  coverEl.style.backgroundImage = `url(${song.cover})`;

  if (audioEl && audioMap[winningType]) {
    audioEl.src = audioMap[winningType];
    audioEl.currentTime = 0;

    if (autoplay) {
      audioEl.play().then(() => {
        vinyl.classList.add("playing");
      }).catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }
}

/* ---------- VINYL CLICK PLAY / PAUSE ---------- */
function playSong() {
  if (!audioEl.src) return;

  if (audioEl.paused) {
    audioEl.play();
    vinyl.classList.add("playing");
  } else {
    audioEl.pause();
    vinyl.classList.remove("playing");
  }
}

/* ---------- RESTART QUIZ ---------- */
function restartQuiz() {
  currentQuestion = 0;
  answers = [];

  if (audioEl) {
    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.src = "";
  }

  vinyl.classList.remove("playing");
  coverEl.style.backgroundImage = "";

  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");

  loadQuestion();
}

/* ---------- INIT ---------- */
loadQuestion();
