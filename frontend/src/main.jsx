import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'

import App from './App'

import './index.css'
import './styles/animations.css'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <div className="app-shell">
        {/* Global atmospheric layers */}
        <div className="global-noise" />

        <div className="global-gradient-orb orb-1" />
        <div className="global-gradient-orb orb-2" />
        <div className="global-gradient-orb orb-3" />

        <div className="global-grid-overlay" />

        {/* Cinematic vignette */}
        <div className="global-vignette" />

        {/* App */}
        <div className="relative z-10">
          <App />
        </div>
      </div>
    </ClerkProvider>
  </React.StrictMode>
)