// ===== VARIABLES =====
let numbers = [];
let currentIndex = 0;
let swappedInPass = false;
let timer = 0;
let interval;
let algorithm = "bubble";
let pivotIndex = 0;

// ===== DOM =====
const bars = document.getElementById("bars");
const timerText = document.getElementById("timer");
const message = document.getElementById("message");

// ===== NAVIGATION =====
function openGame(algo) {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  algorithm = algo;

  document.getElementById("gameTitle").textContent =
    algo.toUpperCase() + " SORT GAME";
}

function goHome() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";
  clearInterval(interval);
}

// ===== SETUP =====
function randomNumbers() {
  numbers = [];
  for (let i = 0; i < 8; i++) {
    numbers.push(Math.floor(Math.random() * 90) + 10);
  }
}

function renderBars() {
  bars.innerHTML = "";

  numbers.forEach((num, i) => {
    let bar = document.createElement("div");
    bar.classList.add("bar");

    // highlight current comparison
    if (i === currentIndex || i === currentIndex + 1) {
      bar.classList.add("highlight");
    }

    // pivot (quick sort)
    if (algorithm === "quick" && i === pivotIndex) {
      bar.classList.add("pivot");
    }

    bar.style.height = num * 3 + "px";
    bar.textContent = num;

    bars.appendChild(bar);
  });
}

// ===== START GAME =====
function startGame() {
  clearInterval(interval);

  timer = 0;
  timerText.textContent = timer;

  currentIndex = 0;
  swappedInPass = false;

  randomNumbers();

  if (algorithm === "quick") {
    pivotIndex = numbers.length - 1;
  }

  renderBars();

  interval = setInterval(() => {
    timer++;
    timerText.textContent = timer;
  }, 1000);

  message.textContent = "Game Started (" + algorithm + ")";
}

// ===== GAME LOGIC =====
function checkAnswer(choice) {

  let correct = false;

  // ===== BUBBLE SORT =====
  if (algorithm === "bubble") {
    let a = numbers[currentIndex];
    let b = numbers[currentIndex + 1];

    correct = a > b;

    if (choice && correct) {
      [numbers[currentIndex], numbers[currentIndex + 1]] =
      [numbers[currentIndex + 1], numbers[currentIndex]];
    }
  }

  // ===== SELECTION SORT =====
  else if (algorithm === "selection") {
    let min = currentIndex;

    for (let i = currentIndex + 1; i < numbers.length; i++) {
      if (numbers[i] < numbers[min]) {
        min = i;
      }
    }

    correct = (min !== currentIndex);

    if (choice && correct) {
      [numbers[currentIndex], numbers[min]] =
      [numbers[min], numbers[currentIndex]];
    }
  }

  // ===== INSERTION SORT =====
  else if (algorithm === "insertion") {
    let key = numbers[currentIndex];
    let j = currentIndex - 1;

    correct = j >= 0 && numbers[j] > key;

    if (choice && correct) {
      numbers[j + 1] = numbers[j];
      numbers[j] = key;
      currentIndex--; // move back
    }
  }

  // ===== QUICK SORT (SIMPLIFIED) =====
  else if (algorithm === "quick") {
    let pivot = numbers[pivotIndex];
    let current = numbers[currentIndex];

    correct = current < pivot;

    if (choice && correct) {
      [numbers[currentIndex], numbers[pivotIndex - 1]] =
      [numbers[pivotIndex - 1], numbers[currentIndex]];

      pivotIndex--;
    }
  }

  // ===== RESULT =====
  if (choice === correct) {
    message.textContent = "✅ Correct";
  } else {
    timer += 2;
    timerText.textContent = timer;
    message.textContent = "❌ Wrong (+2s)";
  }

  currentIndex++;

  // ===== END CONDITION =====
  if (currentIndex >= numbers.length - 1) {
    clearInterval(interval);
    message.textContent += " | Finished!";
    renderBars();
    return;
  }

  renderBars();
}
