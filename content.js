(() => {
  console.log("Content.js loaded");

  // Wait for an element to appear
  function waitForElement(selector, interval = 300, timeout = 5000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const el = document.querySelector(selector);
        if (el) {
          clearInterval(timer);
          resolve(el);
        } else if (Date.now() - startTime > timeout) {
          clearInterval(timer);
          resolve(null);
        }
      }, interval);
    });
  }

  async function getJobData() {
    // LinkedIn dynamic selectors
    const jobTitleEl = await waitForElement("h1[data-test-job-title]");
    const companyEl = await waitForElement(".topcard__org-name-link");
    const locationEl = await waitForElement(".topcard__flavor--bullet");

    const jobTitle = jobTitleEl?.innerText.trim() || "Unknown Position";
    const company = companyEl?.innerText.trim() || document.title;
    const location = locationEl?.innerText.trim() || "";

    console.log("Scraped job data:", { jobTitle, company, location });

    return { jobTitle, company, location, url: window.location.href, notes: "" };
  }

  // Listen for popup requests
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getJobData") {
      getJobData().then(data => sendResponse(data));
    }
    return true; // keep channel open for async response
  });
})();
