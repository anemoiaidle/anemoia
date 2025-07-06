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

  const notificationSection = document.querySelector('.notification-section');

  const levelUpDiv = document.createElement('div');
  levelUpDiv.classList.add('notification');

  const notificationHeader = document.createElement('div');
  notificationHeader.classList.add('notification-header');

  const icon = document.createElement('span');
  icon.classList.add('material-symbols-outlined');
  icon.textContent = 'award_star';

  const textNode = document.createTextNode(' LEVEL UP! ');
  notificationHeader.appendChild(icon);
  notificationHeader.appendChild(textNode);

  const notificationDesc = document.createElement('div');
  notificationDesc.classList.add('notification-description')

  const notifText = document.createElement('span');
  notifText.textContent = `You've reached Level ${level}.`;

  notificationDesc.appendChild(notifText);

  levelUpDiv.appendChild(notificationHeader);
  levelUpDiv.appendChild(notificationDesc);

  notificationSection.appendChild(levelUpDiv)

  levelUpDiv.addEventListener('click', () => {
    levelUpDiv.remove();
  })

  const currentNotifications = notificationSection.querySelectorAll('.notification');
  if (currentNotifications.length > 5) {
    currentNotifications[0].remove(); // Remove the oldest (first)
  }
}

