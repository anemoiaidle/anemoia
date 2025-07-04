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

export function getGoldPerSecond() {
   return goldPerSecond;
}

export function setGoldPerSecond(value) {
   goldPerSecond = value;
}

/////////////////////

export function getGoldCount() {
   return goldCount;
}

export function setGoldCount(value) {
   goldCount = value;
}

////////////////////////

export function getTotalClicks() {
   return totalClicks;
}

export function getTotalGoldEarned() {
   return totalGoldEarned;
}

export function setTotalGoldEarned(value) {
   totalGoldEarned = value;
}

export function getLegacyStart() {
   return legacyStart;
}

export function getBuildingsOwned() {
   return buildingsOwned;
}

export function incrementBuildingsOwned() {
   buildingsOwned++;
}

export function getGoldPerClick() {
   return goldPerClick;
}

export function getGoldEarnedClicking() {
   return goldEarnedClicking;
}

export function setGoldEarnedClicking(value) {
   goldEarnedClicking = value;
}

export function getProgressClicks() {
   return progressClicks;
}

export function incrementProgressClicks() {
   progressClicks++;
}

export function setProgressClicks(value) {
   progressClicks = value;
}

export function getClickGoal() {
   return clickGoal;
}

export function getLastUpdate() {
   return lastUpdate;
}

export function setLastUpdate(value) {
   lastUpdate = value;
}

export function getIsHidden() {
   return isHidden;
}

export function incrementTotalClicks() {
   totalClicks++;
}