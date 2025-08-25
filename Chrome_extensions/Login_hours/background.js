chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.url.startsWith("https://cashify.kapturecrm.com/nui/tickets/assigned_to_me/")) {
    const { agentName } = await chrome.storage.local.get("agentName");

    // Run only if agentName not stored yet (first login)
    if (!agentName) {
      chrome.scripting.executeScript(
        {
          target: { tabId: details.tabId },
          func: () => {
            return new Promise((resolve) => {
              function tryFetch(retries = 20) {
                const agentElement = Array.from(document.querySelectorAll("p"))
                  .find(
                    (p) =>
                      p.classList.contains("font-600") &&
                      p.classList.contains("capitalize")
                  );
                if (agentElement) {
                  resolve({
                    agentName: agentElement.textContent.trim(),
                    loginTime: new Date().toLocaleString(),
                  });
                } else if (retries > 0) {
                  setTimeout(() => tryFetch(retries - 1), 500); // retry every 0.5s
                } else {
                  resolve({ agentName: null, loginTime: null });
                }
              }
              tryFetch();
            });
          },
        },
        async (results) => {
          if (results && results[0] && results[0].result.agentName) {
            const { agentName, loginTime } = results[0].result;
            await chrome.storage.local.set({ agentName, loginTime });
            console.log("✅ Stored agent:", agentName, "at", loginTime);
          } else {
            console.log("❌ Could not fetch agent name");
          }
        }
      );
    }
  }
});
