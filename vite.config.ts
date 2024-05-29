import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "node:path";
import { join } from "path";
const stableLibs = ["vue", "vue-router", "axios", "lodash-es"]; // 根据你的项目调整这个列表

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      svgLoader(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg-icon")],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": join(__dirname, "/src"),
      },
    },
    test: {
      global: true,
      environment: "jsdom",
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue", "vue-router", "pinia"],
          },
          chunkFileNames(chunkInfo) {
            if (["vendor"].includes(chunkInfo.name)) return "assets/vendor.js";
            return 'assets/[name]-[hash].js'
          },
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 10086,
      strictPort: true,
      proxy: {
        "^/api": {
          target: "https://www.hao123.com",
          changeOrigin: true,
        },
      },
    },
  };
});
