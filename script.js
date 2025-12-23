/*
   QUESTIONS ARRAY
   This is an ARRAY of OBJECTS.
   Each object represents one quiz question.
*/
const questions = [
  {
    // Question text (string)
    text: "What Energy Does Your House Give Off?",

    // OPTIONS is an array of objects
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

/* 
   SONG RESULTS OBJECT
   This is an OBJECT used like a lookup table.
   Each key matches a quiz result type.
*/
const songResults = {
  cozy: {
    title: "It's Beginning To Look A Lot Like Christmas",
    cover: "imgs/cozy-album.png"
  },
  classic: {
    title: "White Christmas",
    cover: "imgs/classic-album.png"
  },
  fun: {
    title: "Rockin’ Around the Christmas Tree",
    cover: "imgs/fun-album.png"
  },
  romantic: {
    title: "All I Want For Christmas Is You",
    cover: "imgs/romantic-album.png"
  }
};

/* 
   AUDIO MAP OBJECT
   Maps result types to audio file paths
*/
const audioMap = {
  cozy: "audio/its-beginning.mp3",
  classic: "audio/white-christmas.mp3",
  fun: "audio/rockin-around.mp3",
  romantic: "audio/mariah-all-i-want.mp3"
};

/*
   STATE VARIABLES
   These track quiz progress
*/
let currentQuestion = 0; // number (index)
let answers = [];        // array to store user choices

/* 
   DOM ELEMENTS
   These connect JS to HTML elements
*/
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const questionText = document.getElementById("question-text");
const optionsGrid = document.getElementById("options-grid");
const songTitleEl = document.getElementById("song-title");
const songDescEl = document.getElementById("song-description");
const coverEl = document.getElementById("cover");
const audioEl = document.getElementById("result-audio");
const vinyl = document.getElementById("vinyl");

/* 
   LOAD QUESTION FUNCTION
   Function: displays current question + options
*/
function loadQuestion() {
  // Set question text
  questionText.textContent = questions[currentQuestion].text;

  // Clear old options
  optionsGrid.innerHTML = "";

  // forEach LOOP: runs once per option
  questions[currentQuestion].options.forEach(option => {
    const div = document.createElement("div");
    div.className = "option";

    // Insert image into option
    div.innerHTML = `<img src="${option.img}" alt="">`;

    // EVENT LISTENER: waits for click
    div.addEventListener("click", () => selectOption(option.type));

    // Add option to the page
    optionsGrid.appendChild(div);
  });
}

/* 
   SELECT OPTION FUNCTION
   Runs when a user clicks an option
*/
function selectOption(type) {
  // Store selected type in array
  answers.push(type);

  // Move to next question
  currentQuestion++;

  // CONDITIONAL
  if (currentQuestion < questions.length) {
    loadQuestion(); // keep going
  } else {
    showResult(true); // end quiz
  }
}

/* 
   SHOW RESULT FUNCTION
   Calculates most common answer
*/
function showResult(autoplay = false) {
  // Hide quiz, show results
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  // OBJECT to count answers
  const counts = {};

  // LOOP: count each answer type
  answers.forEach(t => counts[t] = (counts[t] || 0) + 1);

  // REDUCE: find most common answer
  const winningType = Object.keys(counts).reduce((a, b) =>
    counts[a] >= counts[b] ? a : b
  );

  const song = songResults[winningType];

  // Update result content
  songTitleEl.textContent = song.title;
  coverEl.style.backgroundImage = `url(${song.cover})`;

  // AUDIO setup
  if (audioEl && audioMap[winningType]) {
    audioEl.src = audioMap[winningType];
    audioEl.currentTime = 0;

    // Optional autoplay
    if (autoplay) {
      audioEl.play().then(() => {
        vinyl.classList.add("playing");
      }).catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }
}

/* 
   PLAY / PAUSE FUNCTION
   Toggles music when vinyl is clicked
*/
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

/* 
   RESTART QUIZ FUNCTION
   Resets everything to start over
*/
function restartQuiz() {
  currentQuestion = 0;
  answers = [];

  // Stop and reset audio
  if (audioEl) {
    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.src = "";
  }

  vinyl.classList.remove("playing");
  coverEl.style.backgroundImage = "";

  // Show quiz again
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");

  loadQuestion();
}

/* 
   INIT
   Runs once when page loads
*/
loadQuestion();
