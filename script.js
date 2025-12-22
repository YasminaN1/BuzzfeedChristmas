/* ===============================
   CHRISTMAS SONG QUIZ – FULL SCRIPT
   Updated with new song results
   =============================== */

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

/* ---------- SELECT ANSWER ---------- */
function selectOption(type) {
  answers.push(type);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

/* ---------- SHOW RESULT ---------- */
function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  // Count answers
  const counts = {};
  answers.forEach(type => {
    counts[type] = (counts[type] || 0) + 1;
  });

  // Determine winning category
  const winningType = Object.keys(counts).reduce((a, b) =>
    counts[a] >= counts[b] ? a : b
  );

  const song = songResults[winningType];

  // Display result
  songTitleEl.textContent = song.title;
  songDescEl.textContent = song.description;

  // Set album cover on vinyl
  coverEl.style.backgroundImage = `url(${song.cover})`;
}

/* ---------- RESTART QUIZ ---------- */
function restartQuiz() {
  currentQuestion = 0;
  answers = [];

  coverEl.style.backgroundImage = "";

  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");

  loadQuestion();
}

/* ---------- INIT ---------- */
loadQuestion();
