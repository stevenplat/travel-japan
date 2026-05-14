import { useState, useEffect } from 'react'
import Wizard from './components/Wizard.jsx'
import CherryBlossomBackground from './components/CherryBlossomBackground.jsx'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

export default function App() {
  const [token, setToken] = useState(null)
  const [tokenClient, setTokenClient] = useState(null)
  const [gisReady, setGisReady] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        clearInterval(interval)
        setGisReady(true)
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPE,
          callback: (response) => {
            if (response.access_token) setToken(response.access_token)
          },
        })
        setTokenClient(client)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const handleSignIn = () => tokenClient?.requestAccessToken()

  const handleSignOut = () => {
    if (token) window.google.accounts.oauth2.revoke(token)
    setToken(null)
  }

  if (!CLIENT_ID) return <MissingConfig />
  if (!token) return <AuthScreen onSignIn={handleSignIn} isLoading={!gisReady} />
  return <Wizard token={token} onSignOut={handleSignOut} />
}

function AuthScreen({ onSignIn, isLoading }) {
  return (
    <div className="fixed inset-0 bg-[#fdfaf8] flex items-center justify-center">
      <CherryBlossomBackground />
      <div className="relative z-10 text-center px-8 max-w-xs w-full">
        <p className="text-[11px] tracking-[0.25em] uppercase text-rose-300 font-medium mb-10">
          Japan Trip Planner
        </p>
        <h1 className="text-4xl font-extralight text-gray-700 leading-tight mb-3">
          Plan your<br />perfect trip
        </h1>
        <p className="text-sm text-gray-400 mb-12 leading-relaxed">
          Add activities to your spreadsheet, one step at a time.
        </p>
        <button
          onClick={onSignIn}
          disabled={isLoading}
          className="inline-flex items-center gap-3 bg-white border border-rose-200 hover:border-rose-400 hover:bg-rose-50 disabled:opacity-40 text-gray-600 text-sm font-medium px-7 py-3.5 rounded-full shadow-sm transition-all duration-200"
        >
          <GoogleIcon />
          {isLoading ? 'Loading…' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )
}

function MissingConfig() {
  return (
    <div className="fixed inset-0 bg-[#fdfaf8] flex items-center justify-center p-8">
      <CherryBlossomBackground />
      <div className="relative z-10 max-w-sm w-full">
        <p className="text-[11px] tracking-[0.25em] uppercase text-rose-300 font-medium mb-6">Setup required</p>
        <p className="text-gray-600 text-sm mb-2">
          Copy <code className="bg-rose-50 px-1.5 py-0.5 rounded text-xs text-rose-400">.env.example</code> to{' '}
          <code className="bg-rose-50 px-1.5 py-0.5 rounded text-xs text-rose-400">.env</code> and add your Google OAuth Client ID.
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          Create one at console.cloud.google.com → APIs &amp; Services → Credentials → OAuth 2.0 Client ID. Add{' '}
          <code className="bg-rose-50 px-1 rounded">http://localhost:5173</code> as an authorized JavaScript origin.
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  )
}
