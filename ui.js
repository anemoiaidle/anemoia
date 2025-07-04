import { formatNumber } from "./utils.js";

// ui.js
let activePanel = null;

function togglePanel(panelId) {
  const panel = document.getElementById(panelId);
  if (panel.classList.contains('active')) {
    panel.classList.remove('active');
    activePanel = null;
  } else {
    panel.classList.add('active');
    activePanel = panel;
  }
}

function makePanelDraggable(panel) {
  let isDragging = false, startX, startY, initialX, initialY;
  const header = panel.querySelector('h3');
  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = panel.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    panel.style.left = `${initialX + deltaX}px`;
    panel.style.top = `${initialY + deltaY}px`;
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

document.querySelectorAll('.panel').forEach(makePanelDraggable);

export function updateGoldCounter() {
  const goldCountFormatted = formatNumber(goldCount)
  document.getElementById('gold-counter').innerText = `Gold: ${goldCountFormatted}`;

  const goldPerSecondFormatted = formatNumber(goldPerSecond)
  document.getElementById('gold-rate').innerText = `${goldPerSecondFormatted} /s`;
}

export function updateStats() {
  document.getElementById('total-clicks').innerText = totalClicks;
  const totalGoldEarnedFormatted = formatNumber(totalGoldEarned);
  document.getElementById('total-gold-earned').innerText = totalGoldEarnedFormatted;
  document.getElementById('legacy-start').innerText = timeSince(legacyStart);
  document.getElementById('buildings-owned').innerText = buildingsOwned;
  document.getElementById('gold-per-click').innerText = goldPerClick;
  const goldEarnedClickingFormatted = formatNumber(goldEarnedClicking);
  document.getElementById('gold-earned-clicking').innerText = goldEarnedClickingFormatted;
}

function timeSince(date) {
  let now = new Date();
  let seconds = Math.floor((now - date) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const claimButton = document.getElementById('claim-button');
  const progressPercentage = (progressClicks / clickGoal) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  if (progressClicks >= clickGoal) {
    progressBar.style.display = 'none';
    claimButton.style.display = 'block';
  }
}
