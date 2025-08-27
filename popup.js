const sheetURL = "https://script.google.com/macros/s/AKfycbzk758XKuKoUawo8jp-CVRWdXraf4ALp4oqyLl6z32iI_7IB1JOSlHOme1iOdiSfzyjeA/exec"; // replace with your Apps Script URL
document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("url");
    const feedbackEl = document.getElementById("feedback");

    // Auto-fill URL with current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.url) {
            urlInput.value = tab.url;
        }
    });

    document.getElementById("saveBtn").addEventListener("click", () => {
        const company = document.getElementById("company").value.trim();
        const position = document.getElementById("position").value.trim();
        const status = document.getElementById("status").value;
        const notes = document.getElementById("notes").value.trim();
        const url = urlInput.value.trim();

        if (!company || !position) {
            feedbackEl.textContent = "Company and Position are required!";
            feedbackEl.style.color = "red";
            return;
        }

        const jobData = {
            company,
            position,
            status,
            notes,
            url,
            date: new Date().toLocaleDateString()
        };

        fetch(sheetURL, {
            method: "POST",
            body: JSON.stringify(jobData),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.text())
        .then(() => {
            feedbackEl.textContent = "✅ Job saved!";
            feedbackEl.style.color = "green";

            // Clear inputs except URL (optional)
            document.getElementById("company").value = "";
            document.getElementById("position").value = "";
            document.getElementById("notes").value = "";
            document.getElementById("status").value = "Applied";
        })
        .catch(() => {
            feedbackEl.textContent = "❌ Failed to save!";
            feedbackEl.style.color = "red";
        });
    });
});
