const sheetURL = "https://script.google.com/macros/s/AKfycbzk758XKuKoUawo8jp-CVRWdXraf4ALp4oqyLl6z32iI_7IB1JOSlHOme1iOdiSfzyjeA/exec"; // <-- Replace this

document.addEventListener("DOMContentLoaded", () => {
  const feedbackEl = document.getElementById("feedback");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (!tab.url.startsWith("http")) {
      feedbackEl.textContent = "Cannot extract data from this page.";
      return;
    }

    chrome.tabs.sendMessage(tab.id, { action: "getJobData" }, (response) => {
      if (chrome.runtime.lastError || !response) {
        feedbackEl.textContent = "❌ Failed to get job data.";
        return;
      }

      const jobData = {
        company: response.company,
        position: response.jobTitle,
        location: response.location,
        url: response.url,
        status: "Applied",
        notes: "",
        date: new Date().toLocaleDateString()
      };

      fetch(sheetURL, {
        method: "POST",
        body: JSON.stringify(jobData),
        headers: { "Content-Type": "application/json" }
      })
      .then(res => res.text())
      .then(() => feedbackEl.textContent = "✅ Job saved successfully!")
      .catch(() => feedbackEl.textContent = "❌ Failed to save");
    });
  });
});
