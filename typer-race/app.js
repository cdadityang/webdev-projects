var allWords = ['apple', 'mango', 'river', 'banana', 'facebook', 'google', 'orkut', 'door', 'watch', 'laptop', 'computer', 'speaker', 'logitech', 'book', 'pen', 'pencil', 'wire', 'cable', 'charger', 'monitor', 'CPU', 'unit', 'processing', 'webcam', 'tape', 'google', 'firefox', 'edge', 'opera'];

const randomWord = document.querySelector(".random-word");
const timer = document.querySelector(".timer");
const gameOver = document.querySelector(".game-over");
const typer = document.querySelector(".typer");
const scorer = document.querySelector(".score");
const newBtn = document.querySelector(".new");

var time = 3;
var score = 0;
var randomWordArray;

function initialOne(){
  randomWordArray = allWords[Math.floor(Math.random() * allWords.length)];
  randomWord.innerText = randomWordArray;
}

function initialTwo(){
  initialOne();
  score = 0;
  scorer.innerText = score;
}

initialOne();
scorer.innerText = score;

function timerRun(){
  timer.innerText = time;
  time = time - 1;
  if(time == -1){
    gameOver.innerText = "Game Over";
    clearInterval(timerSet);
  }
};

var timerSet = setInterval(timerRun, 1000);

typer.addEventListener('keydown', function(){
  if(typer.value == randomWordArray){
    if(gameOver.innerText == "Game Over"){
      score = 0;
      gameOver.innerText = "";
    }
    clearInterval(timerSet);
    score += 1;
    scorer.innerText = score;
    typer.value = "";
    initialOne();
    time = 3;
    timerSet = setInterval(timerRun, 1000);
  }
});

newBtn.addEventListener('click', function(){
  initialTwo();
  clearInterval(timerSet);
  time = 3;
  timerSet = setInterval(timerRun, 1000);
  gameOver.innerText = "";
});