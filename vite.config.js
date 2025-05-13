import { resolve } from 'path'
import { defineConfig } from "vite";
import handlebars from 'vite-plugin-handlebars';
import injectHTML from 'vite-plugin-html-inject';
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { DEFAULT_OPTIONS } from './config/imageOptimizerConfig';
import cssnanoPlugin from 'cssnano';
import viteHTMLIncludes from '@kingkongdevs/vite-plugin-html-includes';

import pages from './vitejs/pages.config'
import { htmlReplacer } from './config/htmlReplacer.js';

const pagesInput = {}

pages.forEach((page => {
    pagesInput[page.name] = page.path
}));

const replaceArr = [
  { src: "http://localhost:8189/harper-0.0.1.umd.js", production: "/harper/harper-0.0.1.umd.js" },
];

export default defineConfig({
  build: {
    target: 'es2017',
    // target: 'es5',
    outDir: 'dist',
    rollupOptions: {
      input: {
        ...pagesInput
      },
      output: {
        // sourcemap: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'app.css') {
            return 'assets/style.css';
          }

          return 'assets/'+assetInfo.name;
        },
        chunkFileNames: (chunkInfo) => {
          console.log(chunkInfo);
          return "assets/[name].js"
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: true,
  },
  plugins: [
    ViteImageOptimizer(DEFAULT_OPTIONS),
    handlebars({
      partialDirectory: resolve(__dirname, 'src/html'),
    }),
    injectHTML(),
    // Минификация CSS
    cssnanoPlugin({
      preset: "default",
    }),
    viteHTMLIncludes({
      componentsPath: '/src/html/',
      componentsDir: '/src/html/'
    }),
    htmlReplacer()
  ],
})