import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rawBase = process.env.VITE_BASE_URL ?? '/'

export default defineConfig({
  plugins: [react()],
  base: rawBase.endsWith('/') ? rawBase : rawBase + '/',
})
