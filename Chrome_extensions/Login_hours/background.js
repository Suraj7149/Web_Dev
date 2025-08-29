async function ensureToday() {
  const todayKey = new Date().toDateString();
  const store = await chrome.storage.local.get("currentDate");
  if (store.currentDate !== todayKey) {
    await chrome.storage.local.set({
      currentDate: todayKey,
      productiveSeconds: 0,
      bioBreakSeconds: 0,
      teaBreakSeconds: 0,
      lunchSeconds: 0,
      offlineSeconds: 0,
      offlineTaskSeconds: 0,
      firstLoginTime: null,
      agentStatus: "Offline",
      lastStart: null,
      agentName: ""
    });
    console.log("[AgentTracker] reset storage for today:", todayKey);
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  await ensureToday();
  chrome.alarms.create("tracker", { periodInMinutes: 1 });
});

chrome.runtime.onStartup.addListener(async () => {
  await ensureToday();
  chrome.alarms.create("tracker", { periodInMinutes: 1 });
});

// helper: accumulate elapsed seconds for the last running status
async function accumulateIfRunning() {
  const store = await chrome.storage.local.get([
    "agentStatus",
    "lastStart",
    "productiveSeconds",
    "bioBreakSeconds",
    "teaBreakSeconds",
    "lunchSeconds",
    "offlineSeconds",
    "offlineTaskSeconds"
  ]);

  if (!store.lastStart || !store.agentStatus) return;

  const now = Date.now();
  const elapsed = Math.max(0, Math.floor((now - store.lastStart) / 1000));
  if (elapsed <= 0) return;

  let updates = { lastStart: now };
  const status = store.agentStatus.toLowerCase();

  if (/available|meeting/.test(status)) {
    updates.productiveSeconds = (store.productiveSeconds || 0) + elapsed;
  } else if (/bio break/.test(status)) {
    updates.bioBreakSeconds = (store.bioBreakSeconds || 0) + elapsed;
  } else if (/tea break/.test(status)) {
    updates.teaBreakSeconds = (store.teaBreakSeconds || 0) + elapsed;
  } else if (/lunch/.test(status)) {
    updates.lunchSeconds = (store.lunchSeconds || 0) + elapsed;
  } else if (/offline - still on task/.test(status)) {
    updates.offlineTaskSeconds = (store.offlineTaskSeconds || 0) + elapsed;
  } else if (/offline/.test(status)) {
    updates.offlineSeconds = (store.offlineSeconds || 0) + elapsed;
  }

  await chrome.storage.local.set(updates);
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "tracker") {
    await ensureToday();
    await accumulateIfRunning();
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg.type === "status-update") {
      const status = (msg.status || "Offline").toString();
      await ensureToday();
      await accumulateIfRunning(); // flush last session
      await chrome.storage.local.set({ agentStatus: status, lastStart: Date.now() });

      // set first login if productive
      if (/(available|meeting)/i.test(status)) {
        const store = await chrome.storage.local.get("firstLoginTime");
        if (!store.firstLoginTime) {
          const loginTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
          await chrome.storage.local.set({ firstLoginTime: loginTime });
        }
      }

      sendResponse({ ok: true });
      return;
    }
  })();
  return true;
});

