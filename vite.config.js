import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    root: "src",
    publicDir: "public",
    base: "/",
    server: {
        host: true,
        open: !isCodeSandbox,
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true,
    },
});
