import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import solid from "vite-plugin-solid";

// eslint-disable-next-line max-lines-per-function
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    let pwaServerPath = env.VITE_PWA_SERVER_PATH;
    // eslint-disable-next-line no-eq-null, eqeqeq
    if (pwaServerPath == null) {
        pwaServerPath = "/Gregor/http/";
    }
    // eslint-disable-next-line no-console
    console.log(`Setting server path to ${pwaServerPath}`);

    return {
        plugins: [
            solid(),
            VitePWA({
                registerType: "autoUpdate",
                manifest: false,
                outDir: "http",
                injectRegister: null,
                includeManifestIcons: true,
                injectManifest: {
                    injectionPoint: "VITE_PLUGIN_MANIFEST",
                    additionalManifestEntries: ["sw.js", "/"],
                    globPatterns: [
                        "**/*.{js,css,html,ico,png,svg,xml,json}",
                        "icons/*.{png,svg}",
                        "assets/*.{js,css,html,ico,png,svg,xml,json}",
                    ],
                },
                strategies: "injectManifest",
            }),
        ],
        define: {
            APP_VERSION: JSON.stringify(
                process.env.npm_package_version + "-" + Date.now().toString(),
            ),
            PWA_SERVER_PATH: JSON.stringify(pwaServerPath),
        },
        server: {
            https: {
                key: fs.readFileSync("../https_cert-key.pem"),
                cert: fs.readFileSync("../https_cert.pem"),
            },
        },
        preview: {
            port: 4173,
        },
        base: "./",
        build: {
            sourcemap: true,
            outDir: "./http",
            emptyOutDir: true,
        },
    };
});
