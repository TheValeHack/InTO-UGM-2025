import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(process.cwd(), 'src/data/google-service-account.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
export async function appendToSheet(sheetName, values) {
  try {
    const range = `${sheetName}!A1`;

    const authClient = await auth.getClient();

    // Fetch existing data to check for duplicates
    const existingData = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });

    const existingRows = existingData.data.values || [];
    const newIdentifier = values[0]; // Assuming the first value is a unique identifier like participant ID

    // Check if the identifier already exists in the sheet
    const isDuplicate = existingRows.some((row) => row[0] === newIdentifier);
    if (isDuplicate) {
      console.log('Data sudah ada di Google Sheets, tidak menambahkan ulang.');
      return;
    }

    // Append the new data
    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [values] },
    });

    console.log('Data berhasil ditambahkan ke Google Sheets');
  } catch (error) {
    console.error('Gagal menambahkan data ke Google Sheets:', error);
    throw new Error('Tidak dapat menyimpan data ke Google Sheets');
  }
}

