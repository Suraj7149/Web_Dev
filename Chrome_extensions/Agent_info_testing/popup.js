document.getElementById("openDashboard").addEventListener("click", () => {
  const url = chrome.runtime.getURL("dashboard.html"); 
  chrome.tabs.create({ url: url });
});
