// ---- Minimal app state
const state = {
  auth: null,         // will hold user/session later
  cars: [],           // will be filled after API later
  activeTab: "all",   // "all" | "available" | "in_use"
};

// ---- Boot
document.addEventListener("DOMContentLoaded", init);

function init() {
  // start on login view until real auth is wired
  showView("login");
  wireLoginDevButton();
  wireTopbar();
  wireTabs();
  renderCars(); // renders empty state
}

// ---- View switching
function showView(viewName) {
  const login = document.getElementById("view-login");
  const dash  = document.getElementById("view-dashboard");
  if (viewName === "login") {
    login.classList.remove("hidden");
    dash.classList.add("hidden");
  } else {
    login.classList.add("hidden");
    dash.classList.remove("hidden");
  }
}

// Dev helper: pretend login (so you can see dashboard now)
function wireLoginDevButton() {
  const btn = document.getElementById("fake-login");
  if (!btn) return;
  btn.addEventListener("click", () => {
    state.auth = { email: "dev@example.com" }; // fake session
    showView("dashboard");
    setActiveTab("all");
    renderCars();
  });
}

// ---- Topbar
function wireTopbar() {
  const signout = document.getElementById("btn-signout");
  if (!signout) return;
  signout.addEventListener("click", () => {
    console.log("Sign out clicked");
    state.auth = null;
    showView("login");
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

// ---- Content rendering (no API yet)
function renderCars() {
  const el = document.getElementById("content");
  const label = tabLabel(state.activeTab);

  // later we'll filter state.cars by activeTab; for now, empty state
  el.innerHTML = `
    <div class="empty-state">
      <strong>${label}</strong><br/>
      No cars to show yet. We’ll connect to the API next.
    </div>
  `;
}

function tabLabel(key) {
  return key === "available" ? "Available Cars"
       : key === "in_use"    ? "Cars In Use"
       : "All Cars";
}
