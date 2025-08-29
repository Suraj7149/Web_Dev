function groupAgents(data) {
  const structure = {
    chat: { "Chat Queue BB Sell Phone": [] },
    whatsapp: { "WhatsApp Queue": [], "WhatsApp Queue (BuyBack)": [] },
    inbound: { "Inbound Call": [] },
    email: { "Support": [] },
    outbound: { "CallBack BuyBack": [] }
  };

  data.forEach(agent => {
    const queue = agent.queue.toLowerCase();

    if (queue.includes("chat queue")) {
      structure.chat["Chat Queue BB Sell Phone"].push(agent);
    } else if (queue.includes("whatsapp queue (buyback)")) {
      structure.whatsapp["WhatsApp Queue (BuyBack)"].push(agent);
    } else if (queue.includes("whatsapp")) {
      structure.whatsapp["WhatsApp Queue"].push(agent);
    } else if (queue.includes("inbound") || queue.includes("call")) {
      structure.inbound["Inbound Call"].push(agent);
    } else if (queue.includes("support")) {
      structure.email["Support"].push(agent);
    } else if (queue.includes("callback")) {
      structure.outbound["CallBack BuyBack"].push(agent);
    }
  });

  return structure;
}

function renderDashboard(data) {
  const grouped = groupAgents(data);
  const tbody = document.getElementById("agentBody");
  tbody.innerHTML = "";

  const maxLen = Math.max(
    grouped.chat["Chat Queue BB Sell Phone"].length,
    grouped.whatsapp["WhatsApp Queue"].length,
    grouped.whatsapp["WhatsApp Queue (BuyBack)"].length,
    grouped.inbound["Inbound Call"].length,
    grouped.email["Support"].length,
    grouped.outbound["CallBack BuyBack"].length
  );

  // Agent Counts
  document.getElementById("chatCount").innerText = grouped.chat["Chat Queue BB Sell Phone"].length;
  document.getElementById("waCount").innerText =
    grouped.whatsapp["WhatsApp Queue"].length + grouped.whatsapp["WhatsApp Queue (BuyBack)"].length;
  document.getElementById("inboundCount").innerText = grouped.inbound["Inbound Call"].length;
  document.getElementById("emailCount").innerText = grouped.email["Support"].length;
  document.getElementById("outCount").innerText = grouped.outbound["CallBack BuyBack"].length;

  // Build rows
  for (let i = 0; i < maxLen; i++) {
    const tr = document.createElement("tr");

    // Chat
    tr.appendChild(createCell(grouped.chat["Chat Queue BB Sell Phone"][i]));

    // WhatsApp
    tr.appendChild(createCell(grouped.whatsapp["WhatsApp Queue"][i]));
    tr.appendChild(createCell(grouped.whatsapp["WhatsApp Queue (BuyBack)"][i]));

    // Inbound
    tr.appendChild(createCell(grouped.inbound["Inbound Call"][i]));

    // Email
    tr.appendChild(createCell(grouped.email["Support"][i]));

    // Outbound
    tr.appendChild(createCell(grouped.outbound["CallBack BuyBack"][i]));

    tbody.appendChild(tr);
  }
}

function createCell(agent) {
  const td = document.createElement("td");
  if (!agent) return td;

  td.innerText = `${agent.empName} (${agent.status})`;
  td.classList.add(agent.status.replace(" ", "_")); // e.g. Available, Not_Available, busy
  return td;
}

// Load from chrome.storage
chrome.storage.local.get("agents", (res) => {
  if (res.agents) renderDashboard(res.agents);
});

// Update when storage changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.agents) {
    renderDashboard(changes.agents.newValue);
  }
});
