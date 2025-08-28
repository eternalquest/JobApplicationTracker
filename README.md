# 📊 Job Application Tracker (Chrome Extension)

A simple and handy **Chrome Extension** that helps you track your job applications directly while browsing.  
With just one click, it saves job details (like company, position, and application URL) into **Google Sheets** for easy tracking and analysis.

---

## 🚀 Features
- 📝 Save job details (company name, role, URL, notes, status) instantly  
- 🔗 Syncs automatically with **Google Sheets**  
- 📊 Easily analyze and organize your applications later  
- ⚡ Lightweight and easy to use  
- 🔒 Works locally in your browser  

---

## 🖼️ Screenshots
> _(Add your screenshots or GIFs here – e.g., extension popup UI, Google Sheet with saved entries)_

---

## 🛠️ Installation & Setup

### 1️⃣ Make a Copy of the Google Sheet
- Open [this template sheet](PUT-YOUR-SHEET-TEMPLATE-LINK-HERE)  
- Go to **File → Make a copy** and save it to your own Google Drive  
- Rename it (e.g., `Job Tracker`)  

---

### 2️⃣ Add the Google Apps Script
1. In your copied sheet, go to **Extensions → Apps Script**  
2. Delete any existing code and paste this:

```javascript
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
```

**Click Deploy → New Deployment → Web App**

Execute as: Me

Who has access: Anyone with the link

Copy the Web App URL (you’ll need this later).
****
**3️⃣ Install the Chrome Extension******
Clone or download this repository:

bash
Copy
Edit
git clone https://github.com/yourusername/JobApplicationTracker.git
or download as ZIP and extract.

Open Chrome and go to:
Copy
Edit
chrome://extensions/
Turn on Developer Mode (top right).

Click Load unpacked and select the extension folder.

The extension will now appear in your toolbar.

**4️⃣ Configure the Extension**
Open the extension’s popup.js (or wherever you have your fetch call).

Find this line:

javascript
Copy
Edit
```const SHEET_WEBHOOK_URL = "PUT-YOUR-WEB-APP-URL-HERE";```
Replace it with your Google Apps Script Web App URL from step 2.

Reload the extension from chrome://extensions/.

**✅ Usage**
Open any job application page

Click the extension icon

Fill in details (Company, Position, Status, Notes)

Hit Save → Data is instantly stored in your Google Sheet 🎉

**⚡ Notes**
Each user needs their own Google Sheet + Apps Script deployment

This ensures privacy (your sheet stays in your own Google Drive)

You can customize the sheet name or add extra fields as needed
