import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['index.tsx'],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: './index.tsx',
      name: 'ReactWinPivot',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'classnames'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          classnames: 'classNames',
        },
      },
    },
    sourcemap: true,
    outDir: 'dist',
  },
});
