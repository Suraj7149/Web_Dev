// working till hours counting correctly 

// document.addEventListener("DOMContentLoaded", async () => {
//   const label = document.getElementById("agent-label");
//   const statusLabel = document.getElementById("agent-status");
//   const statusDiv = document.querySelector(".current_status");
//   const dateLabel = document.getElementById("current-date");
//   const loginLabel = document.getElementById("first-login");
//   const productiveLabel = document.getElementById("productive-hours");
//   const logoutLabel = document.getElementById("expected-logout");

//   // ✅ Break spans (make sure popup.html has these IDs!)
//   const bioLabel = document.getElementById("bio-break-time");
//   const teaLabel = document.getElementById("tea-break-time");
//   const lunchLabel = document.getElementById("lunch-time");
//   const offlineLabel = document.getElementById("offline-time");
//   const offlineTaskLabel = document.getElementById("offline-task-time");

//   // 📅 Current date
//   const today = new Date();
//   dateLabel.textContent = today.toLocaleString("en-US", {
//     weekday: "long", year: "numeric", month: "long", day: "numeric"
//   });

//   // Load stored data
//   const data = await chrome.storage.local.get([
//     "agentName",
//     "agentStatus",
//     "firstLoginTime",
//     "productiveSeconds",
//     "bioBreakSeconds",
//     "teaBreakSeconds",
//     "lunchSeconds",
//     "offlineSeconds",
//     "offlineTaskSeconds",
//     "lastStart",
//     "expectedLogoutTime"
//   ]);

//   if (data.agentName) label.textContent = `Agent: ${data.agentName}`;
//   if (data.agentStatus) updateStatusUI(data.agentStatus);
//   if (data.firstLoginTime) loginLabel.textContent = data.firstLoginTime;
//   updateProductiveLabel(data.productiveSeconds || 0);
//   updateBreakLabels(data);

//   // ⏱ Smooth ticking for live updates
//   let tickInterval = null;
//   function startSmoothTick() {
//     if (tickInterval) return;
//     tickInterval = setInterval(async () => {
//       const store = await chrome.storage.local.get([
//         "productiveSeconds",
//         "bioBreakSeconds",
//         "teaBreakSeconds",
//         "lunchSeconds",
//         "offlineSeconds",
//         "offlineTaskSeconds",
//         "lastStart",
//         "agentStatus"
//       ]);
//       let updates = { ...store };

//       if (store.lastStart && store.agentStatus) {
//         const elapsed = Math.floor((Date.now() - store.lastStart) / 1000);
//         const status = store.agentStatus.toLowerCase();

//         if (/available|meeting/.test(status)) {
//           updates.productiveSeconds += elapsed;
//         } else if (/bio break/.test(status)) {
//           updates.bioBreakSeconds += elapsed;
//         } else if (/tea break/.test(status)) {
//           updates.teaBreakSeconds += elapsed;
//         } else if (/lunch/.test(status)) {
//           updates.lunchSeconds += elapsed;
//         } else if (/offline - still on task/.test(status)) {
//           updates.offlineTaskSeconds += elapsed;
//         } else if (/offline/.test(status)) {
//           updates.offlineSeconds += elapsed;
//         }
//       }

//       updateProductiveLabel(updates.productiveSeconds);
//       updateBreakLabels(updates);
//     }, 1000);
//   }

//   function stopSmoothTick() {
//     if (tickInterval) clearInterval(tickInterval);
//     tickInterval = null;
//   }

//   startSmoothTick();

//   // 🔄 React to storage changes
//   chrome.storage.onChanged.addListener((changes) => {
//     if (changes.agentName) label.textContent = `Agent: ${changes.agentName.newValue}`;
//     if (changes.agentStatus) updateStatusUI(changes.agentStatus.newValue);
//     if (changes.firstLoginTime) loginLabel.textContent = changes.firstLoginTime.newValue;
//     if (changes.productiveSeconds) updateProductiveLabel(changes.productiveSeconds.newValue);
//     updateBreakLabelsFromChanges(changes);
//   });

//   // --- UI helpers ---
//   function updateStatusUI(status) {
//     statusLabel.textContent = status;
//     if (/(available|meeting)/i.test(status || "")) {
//       statusDiv?.classList.add("active");
//     } else {
//       statusDiv?.classList.remove("active");
//     }
//   }

//   function updateProductiveLabel(secs) {
//     productiveLabel.textContent = formatTime(secs);
//   }

//   function updateBreakLabels(store) {
//     bioLabel.textContent = formatTime(store.bioBreakSeconds || 0);
//     teaLabel.textContent = formatTime(store.teaBreakSeconds || 0);
//     lunchLabel.textContent = formatTime(store.lunchSeconds || 0);
//     offlineLabel.textContent = formatTime(store.offlineSeconds || 0);
//     offlineTaskLabel.textContent = formatTime(store.offlineTaskSeconds || 0);
//   }

//   function updateBreakLabelsFromChanges(changes) {
//     if (changes.bioBreakSeconds) bioLabel.textContent = formatTime(changes.bioBreakSeconds.newValue);
//     if (changes.teaBreakSeconds) teaLabel.textContent = formatTime(changes.teaBreakSeconds.newValue);
//     if (changes.lunchSeconds) lunchLabel.textContent = formatTime(changes.lunchSeconds.newValue);
//     if (changes.offlineSeconds) offlineLabel.textContent = formatTime(changes.offlineSeconds.newValue);
//     if (changes.offlineTaskSeconds) offlineTaskLabel.textContent = formatTime(changes.offlineTaskSeconds.newValue);
//   }

//   function formatTime(secs) {
//     const h = String(Math.floor(secs / 3600)).padStart(2, "0");
//     const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
//     const s = String(secs % 60).padStart(2, "0");
//     return `${h}:${m}:${s}`;
//   }

//   // 🚀 Fetch agent info from CRM tab
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   if (tab?.url?.includes("cashify.kapturecrm.com/nui/tickets/")) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => {
//         const agentElement = Array.from(document.querySelectorAll("p"))
//           .find(p => p.classList.contains("font-600") && p.classList.contains("capitalize"));
//         const agentName = agentElement ? agentElement.textContent.trim() : null;

//         // ✅ more flexible selector for status
//         const statusElement = document.querySelector("label[title]");
//         const agentStatus = statusElement ? statusElement.getAttribute("title").trim() : null;

//         return { agentName, agentStatus };
//       },
//     }, async(results) => {
//       if (chrome.runtime.lastError) return;
//       if (results && results[0] && results[0].result) {
//         const { agentName, agentStatus } = results[0].result;
//         if (agentName) chrome.storage.local.set({ agentName });
//         if (agentStatus) {
//           statusLabel.textContent = agentStatus;
//           updateStatusUI(agentStatus);
//           chrome.runtime.sendMessage({ type: "status-update", status: agentStatus });
//         }
//       }
//     });
//   }
// });




























/* popup.js (patched with expected logout time) */
































// working till hours counting + logout time correctly


// document.addEventListener("DOMContentLoaded", async () => {
//   const label = document.getElementById("agent-label");
//   const statusLabel = document.getElementById("agent-status");
//   const statusDiv = document.querySelector(".current_status");
//   const dateLabel = document.getElementById("current-date");
//   const loginLabel = document.getElementById("first-login");
//   const productiveLabel = document.getElementById("productive-hours");
//   const logoutLabel = document.getElementById("expected-logout");

//   // ✅ Break spans (make sure popup.html has these IDs!)
//   const bioLabel = document.getElementById("bio-break-time");
//   const teaLabel = document.getElementById("tea-break-time");
//   const lunchLabel = document.getElementById("lunch-time");
//   const offlineLabel = document.getElementById("offline-time");
//   const offlineTaskLabel = document.getElementById("offline-task-time");

//   // 📅 Current date
//   const today = new Date();
//   dateLabel.textContent = today.toLocaleString("en-US", {
//     weekday: "long", year: "numeric", month: "long", day: "numeric"
//   });

//   // --- Helper: Parse "hh:mm:ss AM/PM" into Date ---
//   function parseTimeToDate(timeStr) {
//     if (!timeStr) return null;
//     const now = new Date();
//     const parts = timeStr.match(/(\d+):(\d+):(\d+)\s?(AM|PM)/i);
//     if (!parts) return null;

//     let hours = parseInt(parts[1], 10);
//     const minutes = parseInt(parts[2], 10);
//     const seconds = parseInt(parts[3], 10);
//     const ampm = parts[4].toUpperCase();

//     if (ampm === "PM" && hours < 12) hours += 12;
//     if (ampm === "AM" && hours === 12) hours = 0;

//     const date = new Date(now);
//     date.setHours(hours, minutes, seconds, 0);
//     return date;
//   }

//   // --- Helper: format Date -> "hh:mm:ss AM/PM"
//   function formatAMPM(date) {
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true
//     });
//   }

//   // --- Update Expected Logout ---
//   function updateExpectedLogout(firstLoginTime) {
//     const loginDate = parseTimeToDate(firstLoginTime);
//     if (!loginDate) {
//       logoutLabel.textContent = "00:00:00";
//       return;
//     }
//     const logoutDate = new Date(loginDate.getTime() + 9 * 60 * 60 * 1000);
//     logoutLabel.textContent = formatAMPM(logoutDate);
//   }

//   // Load stored data
//   const data = await chrome.storage.local.get([
//     "agentName",
//     "agentStatus",
//     "firstLoginTime",
//     "productiveSeconds",
//     "bioBreakSeconds",
//     "teaBreakSeconds",
//     "lunchSeconds",
//     "offlineSeconds",
//     "offlineTaskSeconds",
//     "lastStart"
//   ]);

//   if (data.agentName) label.textContent = `Agent: ${data.agentName}`;
//   if (data.agentStatus) updateStatusUI(data.agentStatus);
//   if (data.firstLoginTime) loginLabel.textContent = data.firstLoginTime;
//   updateProductiveLabel(data.productiveSeconds || 0);
//   updateBreakLabels(data);

//   // ✅ update expected logout initially
//   if (data.firstLoginTime) updateExpectedLogout(data.firstLoginTime);

//   // ⏱ Smooth ticking for live updates
//   let tickInterval = null;
//   function startSmoothTick() {
//     if (tickInterval) return;
//     tickInterval = setInterval(async () => {
//       const store = await chrome.storage.local.get([
//         "productiveSeconds",
//         "bioBreakSeconds",
//         "teaBreakSeconds",
//         "lunchSeconds",
//         "offlineSeconds",
//         "offlineTaskSeconds",
//         "lastStart",
//         "agentStatus"
//       ]);
//       let updates = { ...store };

//       if (store.lastStart && store.agentStatus) {
//         const elapsed = Math.floor((Date.now() - store.lastStart) / 1000);
//         const status = store.agentStatus.toLowerCase();

//         if (/available|meeting/.test(status)) {
//           updates.productiveSeconds += elapsed;
//         } else if (/bio break/.test(status)) {
//           updates.bioBreakSeconds += elapsed;
//         } else if (/tea break/.test(status)) {
//           updates.teaBreakSeconds += elapsed;
//         } else if (/lunch/.test(status)) {
//           updates.lunchSeconds += elapsed;
//         } else if (/offline - still on task/.test(status)) {
//           updates.offlineTaskSeconds += elapsed;
//         } else if (/offline/.test(status)) {
//           updates.offlineSeconds += elapsed;
//         }
//       }

//       updateProductiveLabel(updates.productiveSeconds);
//       updateBreakLabels(updates);
//     }, 1000);
//   }

//   function stopSmoothTick() {
//     if (tickInterval) clearInterval(tickInterval);
//     tickInterval = null;
//   }

//   startSmoothTick();

//   // 🔄 React to storage changes
//   chrome.storage.onChanged.addListener((changes) => {
//     if (changes.agentName) label.textContent = `Agent: ${changes.agentName.newValue}`;
//     if (changes.agentStatus) updateStatusUI(changes.agentStatus.newValue);
//     if (changes.firstLoginTime) {
//       loginLabel.textContent = changes.firstLoginTime.newValue;
//       updateExpectedLogout(changes.firstLoginTime.newValue);
//     }
//     if (changes.productiveSeconds) updateProductiveLabel(changes.productiveSeconds.newValue);
//     updateBreakLabelsFromChanges(changes);
//   });

//   // --- UI helpers ---
//   function updateStatusUI(status) {
//     statusLabel.textContent = status;
//     if (/(available|meeting)/i.test(status || "")) {
//       statusDiv?.classList.add("active");
//     } else {
//       statusDiv?.classList.remove("active");
//     }
//   }

//   function updateProductiveLabel(secs) {
//     productiveLabel.textContent = formatTime(secs);
//   }

//   function updateBreakLabels(store) {
//     bioLabel.textContent = formatTime(store.bioBreakSeconds || 0);
//     teaLabel.textContent = formatTime(store.teaBreakSeconds || 0);
//     lunchLabel.textContent = formatTime(store.lunchSeconds || 0);
//     offlineLabel.textContent = formatTime(store.offlineSeconds || 0);
//     offlineTaskLabel.textContent = formatTime(store.offlineTaskSeconds || 0);
//   }

//   function updateBreakLabelsFromChanges(changes) {
//     if (changes.bioBreakSeconds) bioLabel.textContent = formatTime(changes.bioBreakSeconds.newValue);
//     if (changes.teaBreakSeconds) teaLabel.textContent = formatTime(changes.teaBreakSeconds.newValue);
//     if (changes.lunchSeconds) lunchLabel.textContent = formatTime(changes.lunchSeconds.newValue);
//     if (changes.offlineSeconds) offlineLabel.textContent = formatTime(changes.offlineSeconds.newValue);
//     if (changes.offlineTaskSeconds) offlineTaskLabel.textContent = formatTime(changes.offlineTaskSeconds.newValue);
//   }

//   function formatTime(secs) {
//     const h = String(Math.floor(secs / 3600)).padStart(2, "0");
//     const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
//     const s = String(secs % 60).padStart(2, "0");
//     return `${h}:${m}:${s}`;
//   }

//   // 🚀 Fetch agent info from CRM tab
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   if (tab?.url?.includes("cashify.kapturecrm.com/nui/tickets/")) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => {
//         const agentElement = Array.from(document.querySelectorAll("p"))
//           .find(p => p.classList.contains("font-600") && p.classList.contains("capitalize"));
//         const agentName = agentElement ? agentElement.textContent.trim() : null;

//         // ✅ more flexible selector for status
//         const statusElement = document.querySelector("label[title]");
//         const agentStatus = statusElement ? statusElement.getAttribute("title").trim() : null;

//         return { agentName, agentStatus };
//       },
//     }, async(results) => {
//       if (chrome.runtime.lastError) return;
//       if (results && results[0] && results[0].result) {
//         const { agentName, agentStatus } = results[0].result;
//         if (agentName) chrome.storage.local.set({ agentName });
//         if (agentStatus) {
//           statusLabel.textContent = agentStatus;
//           updateStatusUI(agentStatus);
//           chrome.runtime.sendMessage({ type: "status-update", status: agentStatus });
//         }
//       }
//     });
//   }
// });


// popup.js (patched with expected logout + total break time)
document.addEventListener("DOMContentLoaded", async () => {
  const label = document.getElementById("agent-label");
  const statusLabel = document.getElementById("agent-status");
  const statusDiv = document.querySelector(".current_status");
  const dateLabel = document.getElementById("current-date");
  const loginLabel = document.getElementById("first-login");
  const productiveLabel = document.getElementById("productive-hours");
  const logoutLabel = document.getElementById("expected-logout");

  // ✅ Break spans
  const bioLabel = document.getElementById("bio-break-time");
  const teaLabel = document.getElementById("tea-break-time");
  const lunchLabel = document.getElementById("lunch-time");
  const offlineLabel = document.getElementById("offline-time");
  const offlineTaskLabel = document.getElementById("offline-task-time");
  const totalBreakLabel = document.getElementById("total-break-time"); // ✅ new span for total break

  // 📅 Current date
  const today = new Date();
  dateLabel.textContent = today.toLocaleString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  // --- Helper: Parse "hh:mm:ss AM/PM" into Date ---
  function parseTimeToDate(timeStr) {
    if (!timeStr) return null;
    const now = new Date();
    const parts = timeStr.match(/(\d+):(\d+):(\d+)\s?(AM|PM)/i);
    if (!parts) return null;

    let hours = parseInt(parts[1], 10);
    const minutes = parseInt(parts[2], 10);
    const seconds = parseInt(parts[3], 10);
    const ampm = parts[4].toUpperCase();

    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const date = new Date(now);
    date.setHours(hours, minutes, seconds, 0);
    return date;
  }

  // --- Helper: format Date -> "hh:mm:ss AM/PM"
  function formatAMPM(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  }

  // --- Update Expected Logout ---
  function updateExpectedLogout(firstLoginTime) {
    const loginDate = parseTimeToDate(firstLoginTime);
    if (!loginDate) {
      logoutLabel.textContent = "00:00:00";
      return;
    }
    const logoutDate = new Date(loginDate.getTime() + 9 * 60 * 60 * 1000);
    logoutLabel.textContent = formatAMPM(logoutDate);
  }

  // --- Update Total Break Time ---
  function updateTotalBreak(store) {
    const total = (store.bioBreakSeconds || 0) +
                  (store.teaBreakSeconds || 0) +
                  (store.lunchSeconds || 0);
    totalBreakLabel.textContent = formatTime(total);
  }

  function updateTotalBreakFromChanges(changes) {
    if (changes.bioBreakSeconds || changes.teaBreakSeconds || changes.lunchSeconds) {
      chrome.storage.local.get(["bioBreakSeconds","teaBreakSeconds","lunchSeconds"], (store) => {
        updateTotalBreak(store);
      });
    }
  }

  // Load stored data
  const data = await chrome.storage.local.get([
    "agentName",
    "agentStatus",
    "firstLoginTime",
    "productiveSeconds",
    "bioBreakSeconds",
    "teaBreakSeconds",
    "lunchSeconds",
    "offlineSeconds",
    "offlineTaskSeconds",
    "lastStart"
  ]);

  if (data.agentName) label.textContent = `Agent: ${data.agentName}`;
  if (data.agentStatus) updateStatusUI(data.agentStatus);
  if (data.firstLoginTime) loginLabel.textContent = data.firstLoginTime;
  updateProductiveLabel(data.productiveSeconds || 0);
  updateBreakLabels(data);

  if (data.firstLoginTime) updateExpectedLogout(data.firstLoginTime);
  updateTotalBreak(data);

  // ⏱ Smooth ticking for live updates
  let tickInterval = null;
  function startSmoothTick() {
    if (tickInterval) return;
    tickInterval = setInterval(async () => {
      const store = await chrome.storage.local.get([
        "productiveSeconds",
        "bioBreakSeconds",
        "teaBreakSeconds",
        "lunchSeconds",
        "offlineSeconds",
        "offlineTaskSeconds",
        "lastStart",
        "agentStatus"
      ]);
      let updates = { ...store };

      if (store.lastStart && store.agentStatus) {
        const elapsed = Math.floor((Date.now() - store.lastStart) / 1000);
        const status = store.agentStatus.toLowerCase();

        if (/available|meeting/.test(status)) {
          updates.productiveSeconds += elapsed;
        } else if (/bio break/.test(status)) {
          updates.bioBreakSeconds += elapsed;
        } else if (/tea break/.test(status)) {
          updates.teaBreakSeconds += elapsed;
        } else if (/lunch/.test(status)) {
          updates.lunchSeconds += elapsed;
        } else if (/offline - still on task/.test(status)) {
          updates.offlineTaskSeconds += elapsed;
        } else if (/offline/.test(status)) {
          updates.offlineSeconds += elapsed;
        }
      }

      updateProductiveLabel(updates.productiveSeconds);
      updateBreakLabels(updates);
      updateTotalBreak(updates);
    }, 1000);
  }

  function stopSmoothTick() {
    if (tickInterval) clearInterval(tickInterval);
    tickInterval = null;
  }

  startSmoothTick();

  // 🔄 React to storage changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.agentName) label.textContent = `Agent: ${changes.agentName.newValue}`;
    if (changes.agentStatus) updateStatusUI(changes.agentStatus.newValue);
    if (changes.firstLoginTime) {
      loginLabel.textContent = changes.firstLoginTime.newValue;
      updateExpectedLogout(changes.firstLoginTime.newValue);
    }
    if (changes.productiveSeconds) updateProductiveLabel(changes.productiveSeconds.newValue);
    updateBreakLabelsFromChanges(changes);
    updateTotalBreakFromChanges(changes);
  });

  // --- UI helpers ---
  function updateStatusUI(status) {
    statusLabel.textContent = status;
    if (/(available|meeting)/i.test(status || "")) {
      statusDiv?.classList.add("active");
    } else {
      statusDiv?.classList.remove("active");
    }
  }

  function updateProductiveLabel(secs) {
    productiveLabel.textContent = formatTime(secs);
  }

  function updateBreakLabels(store) {
    bioLabel.textContent = formatTime(store.bioBreakSeconds || 0);
    teaLabel.textContent = formatTime(store.teaBreakSeconds || 0);
    lunchLabel.textContent = formatTime(store.lunchSeconds || 0);
    offlineLabel.textContent = formatTime(store.offlineSeconds || 0);
    offlineTaskLabel.textContent = formatTime(store.offlineTaskSeconds || 0);
  }

  function updateBreakLabelsFromChanges(changes) {
    if (changes.bioBreakSeconds) bioLabel.textContent = formatTime(changes.bioBreakSeconds.newValue);
    if (changes.teaBreakSeconds) teaLabel.textContent = formatTime(changes.teaBreakSeconds.newValue);
    if (changes.lunchSeconds) lunchLabel.textContent = formatTime(changes.lunchSeconds.newValue);
    if (changes.offlineSeconds) offlineLabel.textContent = formatTime(changes.offlineSeconds.newValue);
    if (changes.offlineTaskSeconds) offlineTaskLabel.textContent = formatTime(changes.offlineTaskSeconds.newValue);
  }

  function formatTime(secs) {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  // 🚀 Fetch agent info from CRM tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url?.includes("cashify.kapturecrm.com/nui/tickets/")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const agentElement = Array.from(document.querySelectorAll("p"))
          .find(p => p.classList.contains("font-600") && p.classList.contains("capitalize"));
        const agentName = agentElement ? agentElement.textContent.trim() : null;

        const statusElement = document.querySelector("label[title]");
        const agentStatus = statusElement ? statusElement.getAttribute("title").trim() : null;

        return { agentName, agentStatus };
      },
    }, async(results) => {
      if (chrome.runtime.lastError) return;
      if (results && results[0] && results[0].result) {
        const { agentName, agentStatus } = results[0].result;
        if (agentName) chrome.storage.local.set({ agentName });
        if (agentStatus) {
          statusLabel.textContent = agentStatus;
          updateStatusUI(agentStatus);
          chrome.runtime.sendMessage({ type: "status-update", status: agentStatus });
        }
      }
    });
  }
});
