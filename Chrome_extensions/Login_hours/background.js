// // let productiveInterval = null;

// // function startTimer() {
// //   if (productiveInterval) return; // already running

// //   productiveInterval = setInterval(async () => {
// //     const { productiveSeconds = 0 } = await chrome.storage.local.get("productiveSeconds");
// //     const newSecs = productiveSeconds + 1;
// //     await chrome.storage.local.set({ productiveSeconds: newSecs });
// //   }, 1000);
// // }

// // function stopTimer() {
// //   if (productiveInterval) {
// //     clearInterval(productiveInterval);
// //     productiveInterval = null;
// //   }
// // }

// // // Listen to status updates from popup or content
// // chrome.runtime.onMessage.addListener((msg) => {
// //   if (msg.type === "status-update") {
// //     if (msg.status.toLowerCase().includes("available")) {
// //       startTimer();
// //     } else {
// //       stopTimer();
// //     }
// //   }
// // });

// // // Reset daily
// // chrome.runtime.onStartup.addListener(async () => {
// //   const todayKey = new Date().toDateString();
// //   const { currentDate } = await chrome.storage.local.get("currentDate");
// //   if (currentDate !== todayKey) {
// //     await chrome.storage.local.set({
// //       currentDate: todayKey,
// //       productiveSeconds: 0,
// //       firstLoginTime: null
// //     });
// //   }
// // });

// let productiveInterval = null;

// function startTimer() {
//   if (productiveInterval) return;
//   productiveInterval = setInterval(async () => {
//     const { productiveSeconds = 0 } = await chrome.storage.local.get("productiveSeconds");
//     await chrome.storage.local.set({ productiveSeconds: productiveSeconds + 1 });
//   }, 1000);
// }

// function stopTimer() {
//   if (productiveInterval) {
//     clearInterval(productiveInterval);
//     productiveInterval = null;
//   }
// }

// // Handle status updates from popup
// chrome.runtime.onMessage.addListener(async (msg) => {
//   if (msg.type === "status-update") {
//     const status = msg.status || "Unknown";
//     await chrome.storage.local.set({ agentStatus: status });

//     if (status.toLowerCase().includes("available")) {
//       // Record first login if not already set
//       const { firstLoginTime } = await chrome.storage.local.get("firstLoginTime");
//       if (!firstLoginTime) {
//         const loginTime = new Date().toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true
//         });
//         await chrome.storage.local.set({ firstLoginTime: loginTime });
//       }
//       startTimer();
//     } else {
//       stopTimer();
//     }
//   }
// });

// // Reset daily
// async function resetDaily() {
//   const todayKey = new Date().toDateString();
//   const { currentDate } = await chrome.storage.local.get("currentDate");
//   if (currentDate !== todayKey) {
//     await chrome.storage.local.set({
//       currentDate: todayKey,
//       productiveSeconds: 0,
//       firstLoginTime: null,
//       agentStatus: "Offline"
//     });
//   }
// }

// chrome.runtime.onStartup.addListener(resetDaily);
// chrome.runtime.onInstalled.addListener(resetDaily);

// document.addEventListener("DOMContentLoaded", async () => {
//   const label = document.getElementById("agent-label");
//   const statusLabel = document.getElementById("agent-status");
//   const statusDiv = document.querySelector(".current_status");
//   const dateLabel = document.getElementById("current-date");
//   const loginLabel = document.getElementById("first-login");
//   const productiveLabel = document.getElementById("productive-hours");

//   // 📅 Current date
//   const today = new Date();
//   dateLabel.textContent = today.toLocaleString("en-US", { 
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric"
//   });

//   // 🗄 Load stored data
//   const data = await chrome.storage.local.get([
//     "agentName",
//     "agentStatus",
//     "firstLoginTime",
//     "productiveSeconds"
//   ]);

//   if (data.agentName) label.textContent = `Agent: ${data.agentName}`;
//   if (data.agentStatus) {
//     updateStatusUI(data.agentStatus);
//   }
//   loginLabel.textContent = data.firstLoginTime || "00:00:00";
//   updateProductiveLabel(data.productiveSeconds || 0);

//   // 🔄 Listen for storage updates
//   chrome.storage.onChanged.addListener((changes) => {
//     if (changes.agentStatus) updateStatusUI(changes.agentStatus.newValue);
//     if (changes.firstLoginTime) loginLabel.textContent = changes.firstLoginTime.newValue;
//     if (changes.productiveSeconds) updateProductiveLabel(changes.productiveSeconds.newValue);
//   });

//   // 🚀 Fetch live data from CRM tab
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   if (tab?.url?.includes("cashify.kapturecrm.com/nui/tickets/assigned_to_me/")) {
//     chrome.scripting.executeScript(
//       {
//         target: { tabId: tab.id },
//         func: () => {
//           const agentElement = Array.from(document.querySelectorAll("p"))
//             .find(p => p.classList.contains("font-600") && p.classList.contains("capitalize"));
//           const agentName = agentElement ? agentElement.textContent.trim() : null;

//           const statusElement = document.querySelector("label[title]");
//           const agentStatus = statusElement ? statusElement.getAttribute("title").trim() : null;

//           return { agentName, agentStatus };
//         },
//       },
//       (results) => {
//         if (results && results[0] && results[0].result) {
//           const { agentName, agentStatus } = results[0].result;

//           if (agentName) {
//             label.textContent = `Agent: ${agentName}`;
//             chrome.storage.local.set({ agentName });
//           }

//           if (agentStatus) {
//             chrome.runtime.sendMessage({
//               type: "status-update",
//               status: agentStatus
//             });
//           }
//         }
//       }
//     );
//   }

//   // UI Helpers
//   function updateStatusUI(status) {
//     statusLabel.textContent = status;
//     if (status?.toLowerCase().includes("available")) {
//       statusDiv?.classList.add("active");
//     } else {
//       statusDiv?.classList.remove("active");
//     }
//   }

//   function updateProductiveLabel(secs) {
//     const h = String(Math.floor(secs / 3600)).padStart(2, "0");
//     const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
//     const s = String(secs % 60).padStart(2, "0");
//     productiveLabel.textContent = `${h}:${m}:${s}`;
//   }
// });

// MV3-safe timer: accumulate elapsed time using timestamps + alarms.
// Counts even when popup is closed / worker sleeps.

// background.js

// Ensure daily reset















// async function ensureToday() {
//   const todayKey = new Date().toDateString();
//   const { currentDate } = await chrome.storage.local.get("currentDate");
//   if (currentDate !== todayKey) {
//     await chrome.storage.local.set({
//       currentDate: todayKey,
//       productiveSeconds: 0,
//       firstLoginTime: null,
//       agentStatus: "Offline",
//       lastStart: null,
//       agentName: ""
//     });
//   }
// }

// chrome.runtime.onInstalled.addListener(ensureToday);
// chrome.runtime.onStartup.addListener(ensureToday);

// // --- Handle status updates from popup ---
// chrome.runtime.onMessage.addListener(async (msg) => {
//   if (msg.type !== "status-update") return;

//   const status = msg.status || "Offline";
//   await ensureToday();
//   await chrome.storage.local.set({ agentStatus: status });

//   const store = await chrome.storage.local.get([
//     "firstLoginTime",
//     "lastStart",
//     "productiveSeconds"
//   ]);

//   const isAvailable = status.toLowerCase().includes("available");

//   if (isAvailable) {
//     // Set first login if not present
//     if (!store.firstLoginTime) {
//       const loginTime = new Date().toLocaleTimeString("en-US", {
//         hour: "2-digit", minute: "2-digit", hour12: true
//       });
//       await chrome.storage.local.set({ firstLoginTime: loginTime });
//     }
//     // Start session if not already running
//     if (!store.lastStart) {
//       await chrome.storage.local.set({ lastStart: Date.now() });
//     }
//   } else {
//     // If switching away, flush elapsed time
//     if (store.lastStart) {
//       const now = Date.now();
//       const elapsed = Math.floor((now - store.lastStart) / 1000);
//       await chrome.storage.local.set({
//         productiveSeconds: (store.productiveSeconds || 0) + elapsed,
//         lastStart: null
//       });
//     }
//   }
// });

// // --- Periodic accumulation ---
// chrome.alarms.create("productivity", { periodInMinutes: 1 });

// chrome.alarms.onAlarm.addListener(async (alarm) => {
//   if (alarm.name !== "productivity") return;
//   await ensureToday();

//   const store = await chrome.storage.local.get([
//     "agentStatus", "lastStart", "productiveSeconds"
//   ]);

//   if (store.agentStatus?.toLowerCase().includes("available") && store.lastStart) {
//     const now = Date.now();
//     const elapsed = Math.floor((now - store.lastStart) / 1000);
//     await chrome.storage.local.set({
//       productiveSeconds: (store.productiveSeconds || 0) + elapsed,
//       lastStart: now
//     });
//   }
// });


// background.js (replace your file with this)
// Debug-friendly: logs each step. Open "Service worker" console on chrome://extensions to see logs.

console.log("[AgentTracker][background] loaded");

async function ensureToday() {
  const todayKey = new Date().toDateString();
  const store = await chrome.storage.local.get("currentDate");
  if (store.currentDate !== todayKey) {
    await chrome.storage.local.set({
      currentDate: todayKey,
      productiveSeconds: 0,
      firstLoginTime: null,
      agentStatus: "Offline",
      lastStart: null,
      agentName: ""
    });
    console.log("[AgentTracker] reset storage for today:", todayKey);
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  console.log("[AgentTracker] onInstalled");
  await ensureToday();
  chrome.alarms.create("productivity", { periodInMinutes: 1 });
});

chrome.runtime.onStartup.addListener(async () => {
  console.log("[AgentTracker] onStartup");
  await ensureToday();
  chrome.alarms.create("productivity", { periodInMinutes: 1 });
});

// Helper: accumulate elapsed seconds if session running
async function accumulateIfRunning() {
  const store = await chrome.storage.local.get(["agentStatus", "lastStart", "productiveSeconds"]);
  const isRunning = store.agentStatus?.toLowerCase().includes("available") && store.lastStart;
  if (!isRunning) {
    console.log("[AgentTracker] accumulateIfRunning: not running");
    return null;
  }

  const now = Date.now();
  const elapsed = Math.max(0, Math.floor((now - store.lastStart) / 1000));
  if (elapsed <= 0) {
    console.log("[AgentTracker] accumulateIfRunning: elapsed 0");
    return 0;
  }

  const newTotal = (store.productiveSeconds || 0) + elapsed;
  await chrome.storage.local.set({
    productiveSeconds: newTotal,
    lastStart: now
  });
  console.log("[AgentTracker] accumulateIfRunning: added", elapsed, "s -> newTotal", newTotal);
  return { elapsed, newTotal };
}

// Alarm handler (wakes service worker periodically)
chrome.alarms.onAlarm.addListener(async (alarm) => {
  try {
    console.log("[AgentTracker] alarm fired:", alarm.name);
    if (alarm.name === "productivity") {
      await ensureToday();
      await accumulateIfRunning();
    }
  } catch (err) {
    console.error("[AgentTracker] alarm error:", err);
  }
});

// Message handler (status updates + debug commands)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      console.log("[AgentTracker] onMessage received:", msg, "from", sender?.id || sender?.url || sender);
      if (!msg || !msg.type) {
        sendResponse({ ok: false, error: "no-type" });
        return;
      }

      if (msg.type === "status-update") {
        const status = (msg.status || "Offline").toString();
        await ensureToday();
        await chrome.storage.local.set({ agentStatus: status });
        console.log("[AgentTracker] status updated ->", status);

        const store = await chrome.storage.local.get(["firstLoginTime", "lastStart", "productiveSeconds"]);
        const now = Date.now();
        const isAvailable = status.toLowerCase().includes("available");

        if (isAvailable) {
          if (!store.firstLoginTime) {
            const loginTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true});
            await chrome.storage.local.set({ firstLoginTime: loginTime });
            console.log("[AgentTracker] set firstLoginTime:", loginTime);
          }
          if (!store.lastStart) {
            await chrome.storage.local.set({ lastStart: now });
            console.log("[AgentTracker] session started, lastStart:", now);
          } else {
            console.log("[AgentTracker] session already running (lastStart present).");
          }
        } else {
          // going away from available: flush elapsed
          if (store.lastStart) {
            const elapsed = Math.max(0, Math.floor((now - store.lastStart) / 1000));
            const newTotal = (store.productiveSeconds || 0) + elapsed;
            await chrome.storage.local.set({ productiveSeconds: newTotal, lastStart: null });
            console.log("[AgentTracker] flushed on status-change:", elapsed, "s -> newTotal", newTotal);
          } else {
            console.log("[AgentTracker] not running on status-change.");
          }
        }

        const final = await chrome.storage.local.get(["agentStatus", "firstLoginTime", "lastStart", "productiveSeconds"]);
        console.log("[AgentTracker] store after status-update:", final);
        sendResponse({ ok: true, final });
        return;
      }

      // debug helpers you can call from the popup / console:
      if (msg.type === "force-flush") {
        // flush elapsed and stop
        const store = await chrome.storage.local.get(["lastStart", "productiveSeconds"]);
        if (store.lastStart) {
          const now = Date.now();
          const elapsed = Math.max(0, Math.floor((now - store.lastStart) / 1000));
          const newTotal = (store.productiveSeconds || 0) + elapsed;
          await chrome.storage.local.set({ productiveSeconds: newTotal, lastStart: null });
          console.log("[AgentTracker] force-flush:", elapsed, "->", newTotal);
          sendResponse({ ok: true, elapsed, newTotal });
        } else {
          sendResponse({ ok: true, message: "no session" });
        }
        return;
      }

      if (msg.type === "debug-accumulate") {
        const result = await accumulateIfRunning();
        sendResponse({ ok: true, result });
        return;
      }

      sendResponse({ ok: false, error: "unknown-type" });
    } catch (err) {
      console.error("[AgentTracker] onMessage handler error:", err);
      try { sendResponse({ ok: false, error: err.message }); } catch (e) {}
    }
  })();
  // return true to indicate we will sendResponse asynchronously
  return true;
});
