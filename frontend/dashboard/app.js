// ---- Minimal app state
const state = {
  auth: null,         // will hold user/session later
  cars: [],           // will be filled after API later
  activeTab: "all",   // "all" | "available" | "in_use"
};

// ---- Boot
document.addEventListener("DOMContentLoaded", init);

async function init() {
  // assume user is logged in from login.html
  state.auth = { email: "user@example.com" }; // placeholder
  showView("dashboard");
  wireTopbar();
  wireTabs();
  await loadCars();
  renderCars();
}

// ---- View switching
function showView(viewName) {
  // only dashboard view now
}

// ---- Load cars from API
async function loadCars() {
  try {
    const response = await fetch("http://127.0.0.1:8000/cars/get_all_cars");
    state.cars = await response.json();
  } catch (error) {
    console.error("Error loading cars:", error);
    state.cars = [];
  }
}

// ---- Topbar
function wireTopbar() {
  const signout = document.getElementById("btn-signout");
  if (!signout) return;
  signout.addEventListener("click", () => {
    console.log("Sign out clicked");
    state.auth = null;
    window.location.href = "../login_page/login.html";
  });
}

// ---- Tabs
function wireTabs() {
  const tabs = document.querySelectorAll("#tabs .tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.tab; // "all" | "available" | "in_use"
      switchTab(key);
    });
  });
}

function switchTab(tabKey) {
  if (!["all", "available", "in_use"].includes(tabKey)) return;
  state.activeTab = tabKey;
  setActiveTab(tabKey);
  renderCars();
}

function setActiveTab(tabKey) {
  const tabs = document.querySelectorAll("#tabs .tab");
  tabs.forEach((t) => {
    t.classList.toggle("is-active", t.dataset.tab === tabKey);
  });
}

// ---- Content rendering
function renderCars() {
  const el = document.getElementById("content");
  const label = tabLabel(state.activeTab);

  // filter cars by activeTab
  let filteredCars = state.cars;
  if (state.activeTab === "available") {
    filteredCars = state.cars.filter(car => car.status);
  } else if (state.activeTab === "in_use") {
    filteredCars = state.cars.filter(car => !car.status);
  }

  if (filteredCars.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        <strong>${label}</strong><br/>
        No cars to show.
      </div>
    `;
    return;
  }

  el.innerHTML = `
    <div class="cars-grid">
      ${filteredCars.map(car => `
        <div class="car-card">
          <img src="${car.image_url}" alt="${car.make} ${car.model}" class="car-image">
          <h3>${car.make} ${car.model} (${car.year})</h3>
          <p>Category: ${car.category}</p>
          <p>Rate: $${car.rate}/day</p>
          <p>Mileage: ${car.mileage}</p>
          <p>Status: ${car.status ? 'Available' : 'In Use'}</p>
          ${car.status ? `<button onclick="selectCar('${car.id}')">Rent This Car</button>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function tabLabel(key) {
  return key === "available" ? "Available Cars"
       : key === "in_use"    ? "Cars In Use"
       : "All Cars";
}

// ---- Select car for rental
function selectCar(carId) {
  window.location.href = `../payment/information.html?car_id=${carId}`;
}
