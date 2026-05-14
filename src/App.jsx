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
        <p className="text-[11px] tracking-[0.25em] uppercase text-rose-300 font-medium mb-6">
          Setup required
        </p>
        <p className="text-gray-600 text-sm mb-2">
          Add <code className="bg-rose-50 px-1.5 py-0.5 rounded text-xs text-rose-400">VITE_APPS_SCRIPT_URL</code> to your{' '}
          <code className="bg-rose-50 px-1.5 py-0.5 rounded text-xs text-rose-400">.env</code> file.
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          Deploy a Google Apps Script Web App from your spreadsheet and paste the URL here.
        </p>
      </div>
    </div>
  )
}
