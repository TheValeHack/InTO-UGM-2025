import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: 'path-to-service-account-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export async function appendToSheet(sheetName, values) {
  const range = `${sheetName}!A1`;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [values] },
  });
}