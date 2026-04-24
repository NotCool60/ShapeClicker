const shapeCountEl = document.getElementById('shape-count');
const shapeClickValueEl = document.getElementById('shape-click-value');
const shapePsValueEl = document.getElementById('shape-ps-value');
const prestigeValueEl = document.getElementById('prestige-value');
const shapeTarget = document.getElementById('shape-target');

const state = {
  shapes: 0,
  shapesPerClick: 1,
  shapesPerSecond: 0,
  prestigeLevel: 0,
};

function updateDisplay() {
  shapeCountEl.textContent = state.shapes.toLocaleString();
  shapeClickValueEl.textContent = state.shapesPerClick.toLocaleString();
  shapePsValueEl.textContent = state.shapesPerSecond.toLocaleString();
  prestigeValueEl.textContent = state.prestigeLevel.toLocaleString();
}

shapeTarget.addEventListener('click', () => {
  state.shapes += state.shapesPerClick;
  updateDisplay();
});

updateDisplay();
