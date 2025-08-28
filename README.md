# 📊 Job Application Tracker (Chrome Extension)

A simple and handy **Chrome Extension** that helps you track your job applications directly while browsing.  
With just one click, it saves job details (like company, position, and application URL) into **Google Sheets** for easy tracking and analysis.

---

## 🚀 Features
- 📝 Save job details (company name, role, URL) instantly  
- 🔗 Syncs automatically with **Google Sheets**  
- 📊 Easily analyze and organize your applications later  
- ⚡ Lightweight and easy to use  
- 🔒 Works locally in your browser  

---

## 🖼️ Screenshots
> _(Add your screenshots or GIFs here – e.g., extension popup UI, Google Sheet with saved entries)_

---

## 🛠️ Installation

### Option 1: Install Locally (Developer Mode)
1. Clone this repository  
   ```bash
   git clone https://github.com/yourusername/JobApplicationTracker.git


Extension

This Chrome extension helps you track your job applications directly into Google Sheets.

Whenever you click the extension while on a job page, it will save details like Company, Position, Status, Notes, and URL to your sheet.

🚀 How to Set It Up
1. Make a Copy of the Google Sheet

Open this template sheet
.

Go to File → Make a copy and save it to your own Google Drive.

Rename it if you want (e.g., Job Tracker).

2. Add the Google Apps Script

In your Google Sheet, go to Extensions → Apps Script.

Delete any existing code and paste this code:

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // change if your sheet name is different
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.company || "",
      data.position || "",
      data.status || "",
      data.notes || "",
      new Date(),
      data.url || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", data: data }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


Click Deploy → New Deployment → Web App.

Set:

Execute as: Me

Who has access: Anyone with the link

Copy the Web App URL (we’ll need this for the extension).

3. Install the Chrome Extension

Download this repository as a ZIP or clone it.

Open Chrome and go to chrome://extensions/.

Turn on Developer Mode (top right).

Click Load unpacked and select the extension folder.

The extension will now appear in your toolbar.

4. Configure the Extension

Open the extension’s background.js (or popup.js if you put the fetch there).

Find the line with the Google Script URL:

const SHEET_WEBHOOK_URL = "PUT-YOUR-WEB-APP-URL-HERE";


Replace it with your own Web App URL from step 2.

Reload the extension from chrome://extensions/.

✅ Usage

Open a job application page.

Click the extension icon.

Fill in details (Company, Position, Status, Notes).

Hit Save → It will store the entry into your Google Sheet.

⚡ Notes

Every user needs their own Google Sheet + Apps Script deployment.
