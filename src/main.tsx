import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OpenAMUI from './lib/OpenAMUI.tsx'
import { setConfig } from './lib/config.ts'

setConfig({})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OpenAMUI />
  </StrictMode>,
)

