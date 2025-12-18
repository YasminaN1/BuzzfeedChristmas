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

let currentQuestion = 0;
let answers = [];

const questionText = document.getElementById("question-text");
const optionsGrid = document.getElementById("options-grid");

function loadQuestion() {
  questionText.textContent = questions[currentQuestion].text;
  optionsGrid.innerHTML = "";

  questions[currentQuestion].options.forEach(option => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `<img src="${option.img}" alt="">`;
    div.onclick = () => selectOption(option.type);
    optionsGrid.appendChild(div);
  });
}

function selectOption(type) {
  answers.push(type);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const counts = {};
  answers.forEach(a => counts[a] = (counts[a] || 0) + 1);

  const vibe = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  const songs = {
    cozy: ["Have Yourself a Merry Little Christmas", "Soft, warm, and nostalgic"],
    classic: ["White Christmas", "Timeless and traditional"],
    fun: ["Rockin’ Around the Christmas Tree", "Energetic and festive"],
    romantic: ["Last Christmas", "Emotional and dreamy"]
  };

  document.getElementById("song-title").textContent = songs[vibe][0];
  document.getElementById("song-description").textContent = songs[vibe][1];
}

function restartQuiz() {
  currentQuestion = 0;
  answers = [];
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
}

loadQuestion();
