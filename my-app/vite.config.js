import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  // Removi o 'root: src' para o Vite encontrar o index.html na raiz da pasta my-app
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
