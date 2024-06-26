import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import solid from "vite-plugin-solid";

// eslint-disable-next-line max-lines-per-function
export default defineConfig(({ command, mode, isPreview }) => {
    const env = loadEnv(mode, process.cwd());
    let pwaServerPath = env.VITE_PWA_SERVER_PATH;
    // eslint-disable-next-line no-eq-null, eqeqeq
    if (pwaServerPath == null) {
        pwaServerPath = "/Bisectriz/";
    }
    // eslint-disable-next-line no-console
    console.log(`Setting server path to ${pwaServerPath}`);

    if (command === "serve" || isPreview === true) {
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
                            "**/*.{js,css,html,ico,png,svg,xml,json,ttf}",
                            "icons/*.{png,svg}",
                            "assets/*.{js,css,html,ico,png,svg,xml,json}",
                        ],
                    },
                    srcDir: "public",
                    filename: "sw.js",
                    strategies: "injectManifest",
                    devOptions: {
                        enabled: true,
                    },
                }),
            ],
            define: {
                __APP_VERSION: JSON.stringify(
                    process.env.npm_package_version +
                        "-" +
                        Date.now().toString(),
                ),
                PWA_SERVER_PATH: JSON.stringify(pwaServerPath),
            },
            server: {
                host: "localhost",
                https: {
                    key: fs.readFileSync("../localhost_https_cert-key.pem"),
                    cert: fs.readFileSync("../localhost_https_cert.pem"),
                },
            },
            preview: {
                port: 4173,
                host: "localhost",
                https: {
                    key: fs.readFileSync("../localhost_https_cert-key.pem"),
                    cert: fs.readFileSync("../localhost_https_cert.pem"),
                },
            },
            base: "./",
            build: {
                sourcemap: true,
                outDir: "./http",
                emptyOutDir: true,
                assetsDir: "./",
            },
        };
    }

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
                        "**/*.{js,css,html,ico,png,svg,xml,json,ttf}",
                        "icons/*.{png,svg}",
                        "assets/*.{js,css,html,ico,png,svg,xml,json}",
                    ],
                },
                srcDir: "public",
                filename: "sw.js",
                strategies: "injectManifest",
                devOptions: {
                    enabled: true,
                },
            }),
        ],
        define: {
            __APP_VERSION: JSON.stringify(
                process.env.npm_package_version + "-" + Date.now().toString(),
            ),
            PWA_SERVER_PATH: JSON.stringify(pwaServerPath),
        },
        base: "./",
        build: {
            sourcemap: true,
            outDir: "./http",
            emptyOutDir: true,
            assetsDir: "./",
        },
    };
});
