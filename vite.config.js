import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    resolve: {
        dedupe: ['three', '@react-three/fiber', '@react-three/drei'],
        alias: {
            'three': path.resolve('./node_modules/three'),
        },
    },
});
