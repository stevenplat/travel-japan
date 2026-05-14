const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL

export async function appendRow(rowData) {
  // mode: 'no-cors' because Apps Script doesn't send CORS headers for POST.
  // The request still reaches the server and appends the row — we just can't
  // read the response body. A thrown error means a network failure.
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ row: rowData }),
    mode: 'no-cors',
  })
}
