function groupAgents(data) {
  const structure = {
    chat: { "Chat Queue BB Sell Phone": [] },
    whatsapp: { "WhatsApp Queue": [], "WhatsApp Queue (BuyBack)": [] },
    inbound: { "Inbound Call": [] },
    email: { "Support": [] },
    outbound: { "CallBack BuyBack": [] }
  };

  data.forEach(agent => {
    const queue = agent.queue ? agent.queue.toLowerCase() : "";
    const name = agent.empName;

    // Add break reason if Not_Available
    if (agent.status.toLowerCase() === "not available" && agent.reason) {
      agent.status = `Not_Available - ${agent.reason}`;
    }

    // WhatsApp dual queue → push in both
    if (queue.includes("whatsapp queue,whatsapp queue (buyback)")) {
      structure.whatsapp["WhatsApp Queue"].push(agent);
      structure.whatsapp["WhatsApp Queue (BuyBack)"].push(agent);
      return;
    }

    // Normal routing
    if (queue.includes("chat queue")) {
      structure.chat["Chat Queue BB Sell Phone"].push(agent);
    } else if (queue.includes("whatsapp queue (buyback)")) {
      structure.whatsapp["WhatsApp Queue (BuyBack)"].push(agent);
    } else if (queue.includes("whatsapp")) {
      structure.whatsapp["WhatsApp Queue"].push(agent);
    } else if (queue.includes("inbound")) { // else if (queue.includes("inbound") || queue.includes("call")) {
      structure.inbound["Inbound Call"].push(agent);
    } else if (queue.includes("support")) {
      structure.email["Support"].push(agent);
    } else if (queue.includes("callback")) {
      structure.outbound["CallBack BuyBack"].push(agent);
    } 
    // Fallback → Inbound Call if queue empty (except Rohit Kumar, Md Saeem)
    else if (!queue || queue.trim() === "") {
      if (name !== "Rohit Kumar" && name !== "Md Saeem" && name !== "Deepak Adhikari") {
        structure.inbound["Inbound Call"].push(agent);
      }
    }
  });

  return structure;
}



function renderDashboard(data) {
  const grouped = groupAgents(data);
  const tbody = document.getElementById("agentBody");
  tbody.innerHTML = "";

  // Unique WhatsApp count
  const uniqueWhatsApp = new Set();
  grouped.whatsapp["WhatsApp Queue"].forEach(a => uniqueWhatsApp.add(a.empCode));
  grouped.whatsapp["WhatsApp Queue (BuyBack)"].forEach(a => uniqueWhatsApp.add(a.empCode));

  // Agent Counts
  // Chat total
    document.getElementById("chatCount").innerText = grouped.chat["Chat Queue BB Sell Phone"].length;

// WhatsApp totals (count separately now)
    document.getElementById("waQueueCount").innerText = grouped.whatsapp["WhatsApp Queue"].length;
    document.getElementById("waBuybackCount").innerText = grouped.whatsapp["WhatsApp Queue (BuyBack)"].length;

// Inbound, Email, Outbound
    document.getElementById("inboundCount").innerText = grouped.inbound["Inbound Call"].length;
    document.getElementById("emailCount").innerText = grouped.email["Support"].length;
    document.getElementById("outCount").innerText = grouped.outbound["CallBack BuyBack"].length;


  // Max rows
  const maxLen = Math.max(
    grouped.chat["Chat Queue BB Sell Phone"].length,
    grouped.whatsapp["WhatsApp Queue"].length,
    grouped.whatsapp["WhatsApp Queue (BuyBack)"].length,
    grouped.inbound["Inbound Call"].length,
    grouped.email["Support"].length,
    grouped.outbound["CallBack BuyBack"].length
  );

  // Build table
  for (let i = 0; i < maxLen; i++) {
  const tr = document.createElement("tr");

  // Serial Number column
  const serialTd = document.createElement("td");
  serialTd.innerText = i + 1;
  serialTd.classList.add("serial-col");
  tr.appendChild(serialTd);

  // Queues
  tr.appendChild(createCell(grouped.chat["Chat Queue BB Sell Phone"][i]));
  tr.appendChild(createCell(grouped.whatsapp["WhatsApp Queue"][i]));
  tr.appendChild(createCell(grouped.whatsapp["WhatsApp Queue (BuyBack)"][i]));
  tr.appendChild(createCell(grouped.inbound["Inbound Call"][i]));
  tr.appendChild(createCell(grouped.email["Support"][i]));
  tr.appendChild(createCell(grouped.outbound["CallBack BuyBack"][i]));

  tbody.appendChild(tr);
    }
}


function createCell(agent) {
  const td = document.createElement("td");
  if (!agent) return td;
  td.innerText = `${agent.empName} (${agent.status})`;
  td.classList.add(agent.status.split(" ")[0]); // e.g. Available, busy, Not_Available
  return td;
}



// Load from chrome.storage
chrome.storage.local.get("agents", (res) => {
  if (res.agents) renderDashboard(res.agents);
});

// Update when storage changes
// Auto update when background updates storage
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.agents) {
    renderDashboard(changes.agents.newValue);
  }
});
