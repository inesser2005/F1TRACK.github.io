import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Define a pasta 'src' como o coração do projeto
  root: 'src',            
  
  // Localização dos assets (relativo à pasta 'src')
  publicDir: '../public', 
  
  build: {
    // Onde os ficheiros finais serão colocados (relativo à pasta 'src')
    outDir: '../dist',    
    // Limpa a pasta dist antes de cada build
    emptyOutDir: true,    
    rollupOptions: {
      // Como o 'root' é 'src', o caminho aqui deve ser direto para o ficheiro
      input: resolve(__dirname, 'src/index.html'), 
    }
  }
})
