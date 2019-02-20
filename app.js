var score = 0;
var lives = 3;
var scoreValue = document.querySelector(".result span");
var result = document.querySelector(".result");
var board = document.querySelector(".board");
var endGame = document.querySelector(".end");
var endGameSpan = document.querySelector(".end span");
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

var zombies = [];

function createZombie() {
  var zombie = document.createElement("div");
  zombies.push(zombie);
  zombie.classList.add("zombie");

  var scale;

  if (isMobile) {
    scale = 0.5 + Math.random() * 0.4;
  } else {
    scale = 0.5 + Math.random() * 1;
  }
  zombie.style.transform = `scale(${scale})`;

  var position = Math.floor(Math.random() * (280 - 50) + 10);
  zombie.style.bottom = `${position}px`;

  var speed = Math.floor(Math.random() * (20 - 10) + 10);
  var walkSpeed = `0.5s,${speed}s`;

  zombie.style.animationDuration = walkSpeed;

  var blur = 1 + Math.random() * 1;
  zombie.style.filter = `blur(${blur}px)`;

  board.appendChild(zombie);

  zombie.addEventListener("animationend", function (evt) {
    endZombie(zombie, evt);
  });
}

function endZombie(zombie, evt) {
  if (evt.animationName === "zombieWalk") {
    score -= 10;
    lives -= 1;
    zombie.remove();
  }
  if (lives === 0) {
    clearInterval(start);
    endGame.style.display = "block";
    endGameSpan.innerText = `Your score is:  ${score} points`;
    endGameSpan.style.display = "block";
    result.style.display = "none";
    zombies.forEach(function (zombie) {
      zombie.remove();
    });
  }
  scoreValue.innerText = score;
}

var start = setInterval(createZombie, 500);

board.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("zombie")) {
    score += 10;
    evt.target.remove();
  }
  scoreValue.innerText = score;
});