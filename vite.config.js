
import { defineConfig } from 'vite'
import plug1 from './vite-plug1.js'


export default defineConfig({
  plugins: [plug1()],
  publicDir: "public",

  esbuild: {
    drop: ['console', 'debugger'],
  },

})
