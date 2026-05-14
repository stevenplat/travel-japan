import Wizard from './components/Wizard.jsx'
import CherryBlossomBackground from './components/CherryBlossomBackground.jsx'

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL

export default function App() {
  if (!APPS_SCRIPT_URL) return <MissingConfig />
  return <Wizard />
}

function MissingConfig() {
  return (
    <div className="fixed inset-0 bg-[#fdfaf8] flex items-center justify-center p-8">
      <CherryBlossomBackground />
      <div className="relative z-10 max-w-sm w-full">
        {/* rose-700 on #fdfaf8 → 5.7:1 ✓ */}
        <p className="text-[11px] tracking-[0.25em] uppercase text-rose-700 font-medium mb-6">
          Setup required
        </p>
        {/* gray-700 on #fdfaf8 → 10:1 ✓ */}
        <p className="text-gray-700 text-sm mb-2">
          Add <code className="bg-rose-50 px-1.5 py-0.5 rounded text-xs text-rose-700">VITE_APPS_SCRIPT_URL</code> to your{' '}
          <code className="bg-rose-50 px-1.5 py-0.5 rounded text-xs text-rose-700">.env</code> file.
        </p>
        {/* gray-600 on #fdfaf8 → 6.4:1 ✓ */}
        <p className="text-gray-600 text-xs leading-relaxed">
          Deploy a Google Apps Script Web App from your spreadsheet and paste the URL here.
        </p>
      </div>
    </div>
  )
}
