import { updateGoldCounter, updateStats, updateProgressBar } from './ui.js'
import { getLastUpdate, setLastUpdate, getGoldPerSecond, getGoldCount, setGoldCount, getTotalGoldEarned, setTotalGoldEarned, getIsHidden } from './gameState.js';

// gameLoop.js
function gameLoop() {
    let now = Date.now();
    let delta = (now - getLastUpdate()) / 1000;
    setLastUpdate(now);
  
    const generatedGold = getGoldPerSecond() * delta;

    const newGoldCount = getGoldCount() + generatedGold;
    setGoldCount(newGoldCount);

    const newTotalGoldEarned = getTotalGoldEarned() + generatedGold;
    setTotalGoldEarned(newTotalGoldEarned)
  
    // Generate EXP from passive gold
    exp += generatedGold * 0.01;
  
    updateGoldCounter();
    updateExpBar();
    updateStats();
    updateProgressBar();
  
    if (!getIsHidden()) {
      requestAnimationFrame(gameLoop);
    }
  }
  
  function startBackgroundInterval() {
    backgroundInterval = setInterval(() => {
      gameLoop();
    }, 1000);
  }
  
  function stopBackgroundInterval() {
    clearInterval(backgroundInterval);
  }
  
  function visibilityChange() {
    if (document.hidden) {
      isHidden = true;
      lastUpdate = Date.now();
      stopBackgroundInterval();
      startBackgroundInterval();
    } else {
      isHidden = false;
      lastUpdate = Date.now();
      stopBackgroundInterval();
      requestAnimationFrame(gameLoop);
    }
  }
  
  export function startGame() {
    requestAnimationFrame(gameLoop);
  }
  