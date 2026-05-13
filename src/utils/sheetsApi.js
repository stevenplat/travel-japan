import { SPREADSHEET_ID, SHEET_GID } from '../config.js'

let cachedSheetName = null

async function resolveSheetName(accessToken) {
  if (cachedSheetName) return cachedSheetName
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const data = await res.json()
  const sheet = data.sheets?.find(s => s.properties?.sheetId === SHEET_GID)
  cachedSheetName = sheet?.properties?.title ?? 'Sheet1'
  return cachedSheetName
}

export async function appendRow(accessToken, rowData) {
  const sheetName = await resolveSheetName(accessToken)
  const range = `${sheetName}!A:L`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [rowData] }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error?.message ?? 'Failed to write to spreadsheet')
  }

  return res.json()
}
