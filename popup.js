sheetURL="https://script.google.com/macros/s/AKfycbwx5qd1NAAS-_S3UMNSm_HuCb9ts2h5oRFHDdls4ROPuwDFC8C2upkYgL6eggiFzAwOqQ/exec"

document.addEventListener("DOMContentLoaded", () => {
    const feedbackEl = document.getElementById("feedback");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        // Only try if the tab is HTTP/HTTPS
        if (!tab.url.startsWith("http")) {
            feedbackEl.textContent = "Cannot extract data from this page.";
            return;
        }

        // Request job data from content.js
        chrome.tabs.sendMessage(tab.id, { action: "getJobData" }, (response) => {
            if (chrome.runtime.lastError || !response) {
                feedbackEl.textContent = "No job data found on this page.";
                return;
            }

            const jobData = {
                company: response.company || tab.title,
                position: response.jobTitle || "Unknown Position",
                location: response.location || "",
                url: tab.url,
                status: "Applied",
                notes: response.notes || "",
                date: new Date().toLocaleDateString()
            };

            // Send to Google Sheets
            fetch(sheetURL, {
                method: "POST",
                body: JSON.stringify(jobData),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.text())
            .then(() => feedbackEl.textContent = "✅ Job application saved!")
            .catch(() => feedbackEl.textContent = "❌ Failed to save");
        });
    });
});
