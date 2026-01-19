/* ============================================================
   TIMBERNOVA — UNIVERSAL APP JS
   Works on ALL pages. No imports. No modules.
   ============================================================ */

window.TN = {};

/* ------------------------------
   AUTH & USERS
------------------------------ */
TN.loadUsers = function () {
  try { return JSON.parse(localStorage.getItem("timberNovaUsers") || "[]"); }
  catch { return []; }
};

TN.saveUsers = function (list) {
  localStorage.setItem("timberNovaUsers", JSON.stringify(list));
};

TN.setCurrentUser = function (user) {
  localStorage.setItem("timberNovaUser", JSON.stringify(user));
};

TN.getCurrentUser = function () {
  try { return JSON.parse(localStorage.getItem("timberNovaUser") || "null"); }
  catch { return null; }
};

TN.requireAuth = function () {
  const u = TN.getCurrentUser();
  if (!u) window.location.href = "index.html";
};

TN.logout = function () {
  localStorage.removeItem("timberNovaUser");
  window.location.href = "index.html";
};

/* ------------------------------
   CLIENTS
------------------------------ */
TN.loadClients = function () {
  try { return JSON.parse(localStorage.getItem("timberNovaClients") || "[]"); }
  catch { return []; }
};

TN.saveClients = function (list) {
  localStorage.setItem("timberNovaClients", JSON.stringify(list));
};

TN.getClientById = function (id) {
  return TN.loadClients().find(c => c.id === id);
};

/* ------------------------------
   CONTRACTS
------------------------------ */
TN.loadContracts = function () {
  try { return JSON.parse(localStorage.getItem("timberNovaContracts") || "[]"); }
  catch { return []; }
};

TN.saveContracts = function (list) {
  localStorage.setItem("timberNovaContracts", JSON.stringify(list));
};

TN.getContractById = function (id) {
  return TN.loadContracts().find(c => c.id === id);
};

/* ------------------------------
   CALENDAR EVENTS
------------------------------ */
TN.loadEvents = function () {
  try { return JSON.parse(localStorage.getItem("timberNovaCalendarEvents") || "[]"); }
  catch { return []; }
};

TN.saveEvents = function (list) {
  localStorage.setItem("timberNovaCalendarEvents", JSON.stringify(list));
};

/* ------------------------------
   SETTINGS
------------------------------ */
TN.loadSettings = function () {
  try { return JSON.parse(localStorage.getItem("timberNovaSettings") || "{}"); }
  catch { return {}; }
};

TN.saveSettings = function (obj) {
  localStorage.setItem("timberNovaSettings", JSON.stringify(obj));
};

/* ------------------------------
   DATE HELPERS
------------------------------ */
TN.todayStr = function () {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

TN.formatDate = function (d) {
  return new Date(d).toLocaleDateString();
};

/* ------------------------------
   ENCYCLOPEDIA
------------------------------ */
TN.ENCYCLOPEDIA = [
  { id:"t1", type:"tree", common:"White oak", latin:"Quercus alba", region:"Eastern US", notes:"Strong, long-lived, iconic canopy.", protocol:"Inspect for deadwood, co-dominant stems, and root issues." },
  { id:"t2", type:"tree", common:"Loblolly pine", latin:"Pinus taeda", region:"Southeast US", notes:"Fast-growing pine common in the Southeast.", protocol:"Check lean, root plate, and wind exposure." },
  { id:"t3", type:"tree", common:"Red maple", latin:"Acer rubrum", region:"Eastern US", notes:"Adaptable with vibrant fall color.", protocol:"Watch for included bark and decay at unions." },
  { id:"p1", type:"plant", common:"English ivy", latin:"Hedera helix", region:"Invasive", notes:"Smothers trees and hides defects.", protocol:"Cut vines at base; allow to die back before climbing." },
  { id:"d1", type:"disease", common:"Armillaria root rot", latin:"Armillaria mellea", region:"Humid temperate", notes:"Fungal root rot; mushrooms at base.", protocol:"Inspect roots; consider removal if structural roots compromised." }
];

TN.searchEncyclopedia = function (query, type="all") {
  const q = query.toLowerCase();
  return TN.ENCYCLOPEDIA.filter(item => {
    if (type !== "all" && item.type !== type) return false;
    return (
      item.common.toLowerCase().includes(q) ||
      item.latin.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q) ||
      item.notes.toLowerCase().includes(q) ||
      item.protocol.toLowerCase().includes(q)
    );
  });
};

TN.treeOfDay = function () {
  const trees = TN.ENCYCLOPEDIA.filter(i => i.type === "tree");
  return trees[Math.floor(Math.random() * trees.length)];
};

/* ------------------------------
   TOOL SEARCH (web)
------------------------------ */
TN.toolSearchWeb = function (query) {
  if (!query.trim()) return;
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
};

/* ------------------------------
   ID HELPER
------------------------------ */
TN.id = function () {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
};
