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
        time: cols[3].innerText.trim(),
        teamLeader: cols[4].innerText.trim(),
        role: cols[5].innerText.trim(),
        reason: cols[6].innerText.trim(), // break reason
        queue: cols[8].innerText.trim()
      };
      data.push(entry);
    }
  });

  chrome.storage.local.set({ agents: data });
})();
