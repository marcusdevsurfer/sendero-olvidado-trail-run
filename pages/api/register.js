import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    lastname,
    phone,
    community,
    emergencyContactName,
    emergencyContactPhone,
    acceptTerms,
  } = req.body;

  if (
    !name ||
    !lastname ||
    !phone ||
    !community ||
    !emergencyContactName ||
    !emergencyContactPhone ||
    acceptTerms !== true
  ) {
    return res.status(400).json({ error: "Faltan datos requeridos." });
  }

  const spreadsheetId = process.env.SPREADSHEET_ID;
  const sheetName = process.env.SHEET_NAME || "Sheet1";

  if (!spreadsheetId) {
    return res.status(500).json({ error: "Falta SPREADSHEET_ID en las variables de entorno." });
  }

  const values = [
    new Date().toISOString(),
    name,
    lastname,
    phone,
    community,
    emergencyContactName,
    emergencyContactPhone,
    acceptTerms ? "Sí" : "No",
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:H`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Sheets API error:", error.message ?? error);
    return res.status(500).json({ error: "Error guardando datos en Google Sheets." });
  }
}
