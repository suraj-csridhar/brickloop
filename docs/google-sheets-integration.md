Google Sheets integration (Quick Enquiry)

Overview
- Target sheet: https://docs.google.com/spreadsheets/d/1TOpZLa9A2y5-c3Gwlt9J-g3YcAmn6Yv1ZW5BNwL-fNg/edit?gid=0
- Schema: Timestamp | Name | Phone | Preferred Area | Budget Range | Looking For
- Frontend: `index.html` (single Submit button) + `assets/js/brickloop.js` posts to an Apps Script Web App URL.

How it works
1) Deploy a Google Apps Script Web App that accepts POST and writes to the sheet.
2) Copy the deployed Web App URL (ends with `/exec`).
3) Set that URL in `assets/js/brickloop.js` as `ENDPOINT_URL`.
4) The form posts fields: `name`, `phone`, `area`, `budget`, `need` and `key`.

Apps Script
1. Open Apps Script: Extensions → Apps Script in your Google Sheet.
2. Paste the script below, replace SHEET_ID if needed, and set `SECRET_KEY` to match the frontend.
3. Deploy → New deployment → Type: Web app → Execute as: Me → Who has access: Anyone with the link → Deploy.

```js
const SHEET_ID   = '1TOpZLa9A2y5-c3Gwlt9J-g3YcAmn6Yv1ZW5BNwL-fNg';
const SHEET_NAME = 'Sheet1'; // change if your tab has a different name
const SECRET_KEY = 'brickloop-lite'; // must match frontend

function doPost(e) {
  try {
    const params = e.parameter || {};
    if (params.key !== SECRET_KEY) return respond({ ok: false, error: 'unauthorized' });

    // Map incoming fields to your schema
    const name   = (params.name   || '').trim();
    const phone  = (params.phone  || '').trim();
    const area   = (params.area   || '').trim();       // Preferred Area
    const budget = (params.budget || '').trim();       // Budget Range
    const need   = (params.need   || '').trim();       // Looking For

    if (!name || !phone) return respond({ ok: false, error: 'missing_fields' });

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
    sh.appendRow([
      new Date(),  // Timestamp
      name,
      phone,
      area,
      budget,
      need
    ]);

    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  }
}

function respond(obj) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  out.setHeader('Access-Control-Allow-Origin', '*');
  out.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  out.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return out;
}

function doOptions(e) { return respond({ ok: true }); }
```

Frontend configuration
- Edit `assets/js/brickloop.js` and set:
  - `ENDPOINT_URL` to your deployed Web App `/exec` URL
  - `SECRET_KEY` to the same value used in the Apps Script

Notes
- CORS: The script sets permissive CORS headers for simple POSTs.
- Validation: The frontend uses HTML5 validation; Apps Script also checks for required fields.
- Privacy: Data is written only to your sheet; no third-party services are used.

