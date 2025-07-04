// gameState.js
let goldCount = 0.00;
let populationCount = 0;
let goldPerSecond = 0;
let totalClicks = 0;
let totalGoldEarned = 0;
let buildingsOwned = 0;
let goldPerClick = 1;
let goldEarnedClicking = 0;
let legacyStart = new Date();
let clickGoal = 100;
let progressClicks = 0;
let lastUpdate = Date.now();
let isHidden = false;
let backgroundInterval;
