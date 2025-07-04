// exp.js
let exp = 0;
let level = 1;
let expToNextLevel = 250;

function updateExpBar() {
  const expBar = document.getElementById('exp-bar');
  const expText = document.getElementById('exp-text');
  const expPercentage = (exp / expToNextLevel) * 100;
  expBar.style.width = `${expPercentage}%`;
  expText.innerText = `EXP: ${exp.toFixed(2)} / ${expToNextLevel.toFixed(2)}`;

  if (exp >= expToNextLevel) {
    levelUp();
  }
  document.getElementById('level-text').innerText = `Level: ${level}`;
}

function levelUp() {
  exp -= expToNextLevel;
  level++;
  expToNextLevel *= 1.5;
  updateExpBar();
  alert(`Congratulations! You've reached Level ${level}!`);
}
