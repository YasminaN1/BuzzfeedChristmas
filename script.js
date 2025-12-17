const questions = [
  {
    text: "Pick a winter aesthetic",
    options: [
      { img: "https://images.unsplash.com/photo-1608889175638-d9b1f30e6d1b", type: "cozy" },
      { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", type: "classic" },
      { img: "https://images.unsplash.com/photo-1543946603-0f3a9cdb7d0b", type: "fun" },
      { img: "https://images.unsplash.com/photo-1544025162-d76694265947", type: "romantic" }
    ]
  },
  {
    text: "Choose a holiday activity",
    options: [
      { img: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5", type: "fun" },
      { img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc", type: "cozy" },
      { img: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf", type: "classic" },
      { img: "https://images.unsplash.com/photo-1546549039-9a20b4b7c7d5", type: "romantic" }
    ]
  },
  {
    text: "Pick a Christmas vibe",
    options: [
      { img: "https://images.unsplash.com/photo-1543258103-a62bdc069871", type: "classic" },
      { img: "https://images.unsplash.com/photo-1519681393784-d120267933ba", type: "cozy" },
      { img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8", type: "fun" },
      { img: "https://images.unsplash.com/photo-1512412046876-f386342eddb3", type: "romantic" }
    ]
  },
  {
    text: "Pick a holiday setting",
    options: [
      { img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b", type: "cozy" },
      { img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc", type: "classic" },
      { img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", type: "fun" },
      { img: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf", type: "romantic" }
    ]
  },
  {
    text: "Choose a holiday mood",
    options: [
      { img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66", type: "romantic" },
      { img: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef", type: "cozy" },
      { img: "https://images.unsplash.com/photo-1485288734756-0b31a0a31d95", type: "classic" },
      { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", type: "fun" }
    ]
  },
  {
    text: "Pick a holiday treat",
    options: [
      { img: "https://images.unsplash.com/photo-1606312619854-6e9b1a7e3b6c", type: "cozy" },
      { img: "https://images.unsplash.com/photo-1546549039-9a20b4b7c7d5", type: "fun" },
      { img: "https://images.unsplash.com/photo-1519681393784-d120267933ba", type: "classic" },
      { img: "https://images.unsplash.com/photo-1512412046876-f386342eddb3", type: "romantic" }
    ]
  },
  {
    text: "Choose your holiday night",
    options: [
      { img: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf", type: "romantic" },
      { img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8", type: "fun" },
      { img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc", type: "classic" },
      { img: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef", type: "cozy" }
    ]
  },
  {
    text: "Pick a Christmas morning",
    options: [
      { img: "https://images.unsplash.com/photo-1543258103-a62bdc069871", type: "classic" },
      { img: "https://images.unsplash.com/photo-1519681393784-d120267933ba", type: "cozy" },
      { img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", type: "fun" },
      { img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66", type: "romantic" }
    ]
  }
];

let currentQuestion = 0;
let answers = [];

const questionText = document.getElementById("question-text");
const optionsGrid = document.getElementById("options-grid");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  nextBtn.disabled = true;
  optionsGrid.innerHTML = "";
  questionText.textContent = questions[currentQuestion].text;

  questions[currentQuestion].options.forEach(option => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `<img src="${option.img}" alt="">`;
    div.onclick = () => selectOption(div, option.type);
    optionsGrid.appendChild(div);
  });
}

function selectOption(element, type) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
  element.classList.add("selected");
  answers[currentQuestion] = type;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.querySelector(".quiz-container").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const counts = {};
  answers.forEach(a => counts[a] = (counts[a] || 0) + 1);

  const vibe = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

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
  document.querySelector(".quiz-container").classList.remove("hidden");
  loadQuestion();
}

loadQuestion();
