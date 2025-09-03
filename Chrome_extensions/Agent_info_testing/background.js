// background.js

// Run every 30s to refresh & scrape
setInterval(async () => {
  // Find the tab where your base website is open
  let [siteTab] = await chrome.tabs.query({ url: "*://your-base-website-domain/*" });

  if (siteTab) {
    // 1. Instead of chrome.tabs.reload → use location.replace (avoids form resubmission popup)
    chrome.scripting.executeScript({
      target: { tabId: siteTab.id },
      func: () => {
        location.replace(window.location.href); // Fresh GET, no form re-submit
      }
    });

    // 2. After reload, wait a bit for DOM to load, then inject scraper
    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId: siteTab.id },
        files: ["content.js"]
      });
    }, 5000);
  }
}, 30000); // every 30 seconds
