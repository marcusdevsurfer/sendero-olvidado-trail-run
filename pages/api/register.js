import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const MAX_PARTICIPANTS = parseInt(process.env.MAX_PARTICIPANTS || "60", 10);
const COUNT_CELL_RANGE = process.env.COUNT_CELL_RANGE?.trim();

async function readCountCell(spreadsheetId, range) {
  const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const value = result.data.values?.[0]?.[0];
  const parsed = parseInt(String(value ?? "").replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

async function writeCountCell(spreadsheetId, range, count) {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[count]] },
  });
}

async function getRegistrationCount(spreadsheetId, sheetName) {
  if (COUNT_CELL_RANGE) {
    const countRange = COUNT_CELL_RANGE.includes("!") ? COUNT_CELL_RANGE : `${sheetName}!${COUNT_CELL_RANGE}`;
    const countFromCell = await readCountCell(spreadsheetId, countRange);
    if (countFromCell !== null) {
      return countFromCell;
    }
  }

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:A`,
  });

  const rows = result.data.values || [];
  const nonEmptyRows = rows.filter(([cell]) => cell?.toString().trim() !== "").length;

  if (rows.length === 0) {
    return 0;
  }

  const firstCell = rows[0][0]?.toString().toLowerCase().trim();
  const headerKeywords = ["timestamp", "fecha", "fecha/hora", "nombre", "name", "apellido", "lastname"];
  const hasHeader = headerKeywords.some((keyword) => firstCell?.includes(keyword));

  return hasHeader ? Math.max(0, nonEmptyRows - 1) : nonEmptyRows;
}

export default async function handler(req, res) {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const sheetName = process.env.SHEET_NAME || "Sheet1";

  if (!spreadsheetId) {
    return res.status(500).json({ error: "Falta SPREADSHEET_ID en las variables de entorno." });
  }

  if (req.method === "GET") {
    try {
      const count = await getRegistrationCount(spreadsheetId, sheetName);
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      return res.status(200).json({
        count,
        maxParticipants: MAX_PARTICIPANTS,
        full: count >= MAX_PARTICIPANTS,
      });
    } catch (error) {
      console.error("Sheets API error:", error.message ?? error);
      return res.status(500).json({ error: "No se pudo obtener el estado de registro." });
    }
  }

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

  try {
    const currentCount = await getRegistrationCount(spreadsheetId, sheetName);

    if (currentCount >= MAX_PARTICIPANTS) {
      return res.status(409).json({
        error: "El cupo para la carrera está lleno. No se pueden registrar más personas.",
      });
    }

    const registrationId = `SO-${currentCount + 1}`;
    const values = [
      new Date().toISOString(),
      registrationId,
      name,
      lastname,
      phone,
      community,
      emergencyContactName,
      emergencyContactPhone,
      acceptTerms ? "Sí" : "No",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:I`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [values] },
    });

    const newCount = currentCount + 1;
    if (COUNT_CELL_RANGE) {
      const countRange = COUNT_CELL_RANGE.includes("!") ? COUNT_CELL_RANGE : `${sheetName}!${COUNT_CELL_RANGE}`;
      await writeCountCell(spreadsheetId, countRange, newCount);
    }

    return res.status(200).json({ success: true, id: registrationId, count: newCount });
  } catch (error) {
    console.error("Sheets API error:", error.message ?? error);
    return res.status(500).json({ error: "Error guardando datos en Google Sheets." });
  }
}
