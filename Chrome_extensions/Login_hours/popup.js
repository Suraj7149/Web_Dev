document.addEventListener("DOMContentLoaded", async () => {
  const label = document.getElementById("agent-label");
  const statusLabel = document.getElementById("agent-status");
  const statusDiv = document.querySelector(".current_status");
  const dateLabel = document.getElementById("current-date");
  const loginLabel = document.getElementById("first-login");
  const productiveLabel = document.getElementById("productive-hours");

  // 📅 Current date
  const today = new Date();
  dateLabel.textContent = today.toLocaleString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  // Load stored values
  const data = await chrome.storage.local.get([
    "agentName", "agentStatus", "firstLoginTime", "productiveSeconds", "lastStart"
  ]);
  if (data.agentName) label.textContent = `Agent: ${data.agentName}`;
  if (data.agentStatus) updateStatusUI(data.agentStatus);
  if (data.firstLoginTime) loginLabel.textContent = data.firstLoginTime;
  updateProductiveLabel(data.productiveSeconds || 0);

  // Smooth ticking while popup is open
  let tickInterval = null;
  function startSmoothTick() {
    if (tickInterval) return;
    tickInterval = setInterval(async () => {
      const { productiveSeconds, lastStart, agentStatus } = await chrome.storage.local.get([
        "productiveSeconds", "lastStart", "agentStatus"
      ]);
      let total = productiveSeconds || 0;
      if (agentStatus?.toLowerCase().includes("available") && lastStart) {
        total += Math.floor((Date.now() - lastStart) / 1000);
      }
      updateProductiveLabel(total);
    }, 1000);
  }
  function stopSmoothTick() {
    if (tickInterval) clearInterval(tickInterval);
    tickInterval = null;
  }
  if (data.agentStatus?.toLowerCase().includes("available")) startSmoothTick();

  // Listen for changes from background
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.agentName) label.textContent = `Agent: ${changes.agentName.newValue}`;
    if (changes.agentStatus) {
      updateStatusUI(changes.agentStatus.newValue);
      if (changes.agentStatus.newValue.toLowerCase().includes("available")) startSmoothTick();
      else stopSmoothTick();
    }
    if (changes.firstLoginTime) loginLabel.textContent = changes.firstLoginTime.newValue;
    if (changes.productiveSeconds) updateProductiveLabel(changes.productiveSeconds.newValue);
  });

  // --- UI helpers ---
  function updateStatusUI(status) {
    statusLabel.textContent = status;
    if (status?.toLowerCase().includes("available")) {
      statusDiv?.classList.add("active");
    } else {
      statusDiv?.classList.remove("active");
    }
  }
  function updateProductiveLabel(secs) {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    productiveLabel.textContent = `${h}:${m}:${s}`;
  }

  // 🚀 Fetch agent info from CRM tab (just like your working version)
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url?.includes("cashify.kapturecrm.com/nui/tickets/assigned_to_me/")) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const agentElement = Array.from(document.querySelectorAll("p"))
            .find(p => p.classList.contains("font-600") && p.classList.contains("capitalize"));
          const agentName = agentElement ? agentElement.textContent.trim() : null;

          const statusElement = document.querySelector("label[title]");
          const agentStatus = statusElement ? statusElement.getAttribute("title").trim() : null;

          return { agentName, agentStatus };
        },
      },
      async(results) => {
  if (chrome.runtime.lastError) {
    console.warn("[popup] executeScript error:", chrome.runtime.lastError.message);
    return;
  }
  if (results && results[0] && results[0].result) {
    const { agentName, agentStatus } = results[0].result;

    if (agentName) {
      label.textContent = `Agent: ${agentName}`;
      chrome.storage.local.set({ agentName }).then(() => {
        console.log("[popup] stored agentName");
      });
    }

    if (agentStatus) {
      statusLabel.textContent = agentStatus;
      updateStatusUI(agentStatus);

      // send message and log any error/response
      chrome.runtime.sendMessage({ type: "status-update", status: agentStatus }, (resp) => {
        if (chrome.runtime.lastError) {
          console.warn("[popup] sendMessage failed:", chrome.runtime.lastError.message);
        } else {
          console.log("[popup] sendMessage response:", resp);
        }
      });
    }
  }
        
    }

    );
  }
});

