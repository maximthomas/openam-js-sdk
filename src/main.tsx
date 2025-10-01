import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OpenAMUI from './OpenAMUI.tsx'
import { setConfig } from './config.ts'

setConfig({})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OpenAMUI />
  </StrictMode>,
)

