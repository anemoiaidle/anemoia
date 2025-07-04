import { formatNumber } from "./utils.js";
import { getGoldCount, getGoldPerSecond, getTotalClicks, getTotalGoldEarned, getLegacyStart, getBuildingsOwned, getGoldPerClick, getGoldEarnedClicking, getProgressClicks, getClickGoal } from "./gameState.js";

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
  const goldCount = getGoldCount();
  const goldPerSecond = getGoldPerSecond();

  const goldCountFormatted = formatNumber(goldCount)
  document.getElementById('gold-counter').innerText = `Gold: ${goldCountFormatted}`;

  const goldPerSecondFormatted = formatNumber(goldPerSecond)
  document.getElementById('gold-rate').innerText = `${goldPerSecondFormatted} /s`;
}

export function updateStats() {
  document.getElementById('total-clicks').innerText = getTotalClicks();
  const totalGoldEarnedFormatted = formatNumber(getTotalGoldEarned());  
  document.getElementById('total-gold-earned').innerText = totalGoldEarnedFormatted;
  document.getElementById('legacy-start').innerText = timeSince(getLegacyStart());
  document.getElementById('buildings-owned').innerText = getBuildingsOwned();
  document.getElementById('gold-per-click').innerText = getGoldPerClick();
  const goldEarnedClickingFormatted = formatNumber(getGoldEarnedClicking());
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
  
  
  const progressPercentage = (getProgressClicks() / getClickGoal()) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  if (getProgressClicks() >= getClickGoal()) {
    progressBar.style.display = 'none';
    claimButton.style.display = 'block';
  }
}

