const shapeCountEl = document.getElementById('shape-count');
const shapeClickValueEl = document.getElementById('shape-click-value');
const shapePsValueEl = document.getElementById('shape-ps-value');
const prestigeValueEl = document.getElementById('prestige-value');
const shapeTarget = document.getElementById('shape-target');
const buildingListEl = document.getElementById('building-list');

const state = {
  shapes: 0,
  shapesPerClick: 1,
  shapesPerSecond: 0,
  prestigeLevel: 0,
  buildings: [
    { name: 'Triangle Factory', cost: 15, production: 1, count: 0 },
    { name: 'Square Mill', cost: 300, production: 5, count: 0 },
    { name: 'Pentagon Plant', cost: 5000, production: 25, count: 0 },
    { name: 'Hexagon Hub', cost: 75000, production: 125, count: 0 },
  ],
};

updateShapesPerSecond();

function renderBuildings() {
  buildingListEl.innerHTML = '';
  state.buildings.forEach((building, index) => {
    const card = document.createElement('div');
    card.className = 'building-card';
    card.innerHTML = `
      <h3>${building.name}</h3>
      <p>Count: ${building.count}</p>
      <p>Cost: ${building.cost.toLocaleString()}</p>
      <p>Production: ${building.production}/s</p>
      <button class="buy-btn">Buy</button>
    `;
    const buyBtn = card.querySelector('.buy-btn');
    buyBtn.addEventListener('click', () => buyBuilding(index));
    buildingListEl.appendChild(card);
  });
}

function updateShapesPerSecond() {
  state.shapesPerSecond = state.buildings.reduce((total, building) => total + building.count * building.production, 0);
}

function buyBuilding(index) {
  const building = state.buildings[index];
  if (state.shapes >= building.cost) {
    state.shapes -= building.cost;
    building.count += 1;
    building.cost = Math.floor(building.cost * 1.15);
    updateShapesPerSecond();
    updateDisplay();
  }
}

function updateDisplay() {
  shapeCountEl.textContent = state.shapes.toLocaleString();
  shapeClickValueEl.textContent = state.shapesPerClick.toLocaleString();
  shapePsValueEl.textContent = state.shapesPerSecond.toLocaleString();
  prestigeValueEl.textContent = state.prestigeLevel.toLocaleString();
  renderBuildings();
}

shapeTarget.addEventListener('click', () => {
  state.shapes += state.shapesPerClick;
  updateDisplay();
});

updateDisplay();

setInterval(() => {
  state.shapes += state.shapesPerSecond;
  updateDisplay();
}, 1000);
