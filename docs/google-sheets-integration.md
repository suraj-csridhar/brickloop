Google Sheets integration (Quick Enquiry)

Overview
- Target sheet: https://docs.google.com/spreadsheets/d/1TOpZLa9A2y5-c3Gwlt9J-g3YcAmn6Yv1ZW5BNwL-fNg/edit?gid=0
- Schema: Timestamp | Name | Phone | Preferred Area | Budget Range | Looking For
- Frontend: `index.html` (single Submit button) + `script.js` posts to an Apps Script Web App URL.

How it works
1) Deploy a Google Apps Script Web App that accepts POST and writes to the sheet.
2) Copy the deployed Web App URL (ends with `/exec`).
3) Set that URL in `script.js` as `ENDPOINT_URL`.
4) The form posts fields: `name`, `phone`, `area`, `budget`, `need` and `key`.

Apps Script
1. Open Apps Script: Extensions → Apps Script in your Google Sheet.
2. Paste the script below, replace SHEET_ID if needed, and set `SECRET_KEY` to match the frontend.
3. Deploy → New deployment → Type: Web app → Execute as: Me → Who has access: Anyone with the link → Deploy.

```js
const SHEET_ID   = '1TOpZLa9A2y5-c3Gwlt9J-g3YcAmn6Yv1ZW5BNwL-fNg';
const SHEET_NAME = 'Sheet1'; // change if your tab has a different name
const SECRET_KEY = 'brickloop-lite'; // must match frontend

function handle(e){
  const params = (e && e.parameter) || {};
  if (params.key !== SECRET_KEY) return json({ ok:false, error:'unauthorized' });

  const name   = (params.name   || '').trim();
  const phone  = (params.phone  || '').trim();
  const area   = (params.area   || '').trim();
  const budget = (params.budget || '').trim();
  const need   = (params.need   || '').trim();

  if (!name || !phone) return json({ ok:false, error:'missing_fields' });

  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  sh.appendRow([ new Date(), name, phone, area, budget, need ]);

  return json({ ok:true });
}

function doPost(e){
  try { return handle(e); } catch (err) { return json({ ok:false, error:String(err) }); }
}

// GET fallback so frontend can retry via GET if POST fails
function doGet(e){
  try { return handle(e); } catch (err) { return json({ ok:false, error:String(err) }); }
}

function json(obj){
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Frontend configuration
- Edit `script.js` and set:
  - `ENDPOINT_URL` to your deployed Web App `/exec` URL
  - `SECRET_KEY` to the same value used in the Apps Script

Notes
- CORS: Using `application/x-www-form-urlencoded` avoids preflight; Apps Script Web App works across origins.
- Validation: The frontend uses HTML5 validation; Apps Script also checks for required fields.
- Privacy: Data is written only to your sheet; no third-party services are used.

Troubleshooting
- Use the Web App URL ending in `/exec`, not `/dev`.
- Deployment must be “Execute as: Me” and “Who has access: Anyone with the link”. Re-deploy after script changes.
- Confirm the sheet tab name matches `SHEET_NAME`.
- Check Apps Script “Executions” for errors when you submit.
- If POST is blocked by a network policy, the frontend auto-retries via GET.
