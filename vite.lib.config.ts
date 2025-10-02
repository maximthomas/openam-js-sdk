import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

console.log(resolve(__dirname, 'src/lib/index.ts'))

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["localhost", "openam.example.org"]
  },
  plugins: [
    react(),
    dts({
      include: ['src/lib/**/*'],
      outDir: 'dist/lib',
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'openam-js-sdk',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  }
})
