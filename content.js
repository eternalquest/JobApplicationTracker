(() => {
  console.log("Debug content.js loaded");

  function getJobData() {
    let jobTitle = document.querySelector("h1")?.innerText || "Unknown Position";
    let company = document.querySelector("a[href*='company']")?.innerText || document.title;
    let location = document.querySelector(".location, .topcard__flavor--bullet")?.innerText || "";

    console.log("Job Title:", jobTitle);
    console.log("Company:", company);
    console.log("Location:", location);

    return { jobTitle, company, location };
  }

  // Test immediately in page
  const testData = getJobData();
  console.log("Test data object:", testData);

  // Listen for popup messages
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getJobData") {
      sendResponse(getJobData());
    }
  });
})();
