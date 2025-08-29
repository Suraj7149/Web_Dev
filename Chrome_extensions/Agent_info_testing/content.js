(() => {
  const rows = document.querySelectorAll("tbody tr");
  let data = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("td");
    if (cols.length >= 9) {
      let entry = {
        empCode: cols[0].innerText.trim(),
        empName: cols[1].innerText.trim(),
        status: cols[2].innerText.trim(),
        queue: cols[8].innerText.trim()
      };
      data.push(entry);
    }
  });

  // Save to chrome.storage
  chrome.storage.local.set({ agents: data });
})();
