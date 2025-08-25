document.addEventListener("DOMContentLoaded", async () => {
  const label = document.getElementById("agent-label");
  const statusLabel = document.getElementById("agent-status");
  const statusDiv = document.querySelector(".current_status");
  const dateLabel = document.getElementById("current-date");
  const loginLabel = document.getElementById("first-login");   // add span in popup.html
  const productiveLabel = document.getElementById("productive-hours"); // add span in popup.html

  let productiveInterval = null;

  // ------------------
  // 📅 Current date
  // ------------------
  const today = new Date();
  const formattedDate = today.toLocaleString("en-US", { 
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  dateLabel.textContent = formattedDate;

  const todayKey = today.toDateString(); // "Sat Aug 23 2025"

  // ------------------
  // 🔄 Reset storage if date changed
  // ------------------
  const storedDate = localStorage.getItem("currentDate");
  if (storedDate !== todayKey) {
    localStorage.setItem("currentDate", todayKey);
    localStorage.removeItem("firstLoginTime");
    localStorage.setItem("productiveSeconds", "0");
  }

  // ------------------
  // Restore from localStorage
  // ------------------
  const storedName = localStorage.getItem("agentName");
  if (storedName) label.textContent = `Agent: ${storedName}`;

  const storedStatus = localStorage.getItem("agentStatus");
  if (storedStatus) {
    statusLabel.textContent = storedStatus;
    if (storedStatus.toLowerCase().includes("available")) {
      statusDiv?.classList.add("active");
      startTimer();
    } else {
      statusDiv?.classList.remove("active");
      stopTimer();
    }
  }

  const storedLogin = localStorage.getItem("firstLoginTime");
  if (storedLogin) loginLabel.textContent = storedLogin;

  const storedSeconds = parseInt(localStorage.getItem("productiveSeconds") || "0");
  updateProductiveLabel(storedSeconds);

  // ------------------
  // 🚀 Fetch live data
  // ------------------
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.url.includes("cashify.kapturecrm.com/nui/tickets/assigned_to_me/")) {
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
      (results) => {
        if (results && results[0] && results[0].result) {
          const { agentName, agentStatus } = results[0].result;

          if (agentName) {
            label.textContent = `Agent: ${agentName}`;
            localStorage.setItem("agentName", agentName);
          }

          if (agentStatus) {
            statusLabel.textContent = agentStatus;
            localStorage.setItem("agentStatus", agentStatus);

            if (agentStatus.toLowerCase().includes("available")) {
              statusDiv?.classList.add("active");

              // ✅ First login time (12hr format)
              if (!localStorage.getItem("firstLoginTime")) {
                const loginTime = new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                });
                localStorage.setItem("firstLoginTime", loginTime);
                loginLabel.textContent = loginTime;
              }

              startTimer();
            } else {
              statusDiv?.classList.remove("active");
              stopTimer();
            }
          }
        }
      }
    );
  }

  // ------------------
  // ⏱ Productive Timer
  // ------------------
  function startTimer() {
    if (productiveInterval) return; // already running
    productiveInterval = setInterval(() => {
      let secs = parseInt(localStorage.getItem("productiveSeconds") || "0");
      secs++;
      localStorage.setItem("productiveSeconds", secs);
      updateProductiveLabel(secs);
    }, 1000);
  }

  function stopTimer() {
    if (productiveInterval) {
      clearInterval(productiveInterval);
      productiveInterval = null;
    }
  }

  function updateProductiveLabel(secs) {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    productiveLabel.textContent = `${h}:${m}:${s}`;
  }
});
