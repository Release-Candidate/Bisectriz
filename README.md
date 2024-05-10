# Gregor PWA

Gregor is a PWA template for VIte, TailwindCSS and Solid.js. This being a PWA means, that you can install the website like an app and use offline.

- [Link to the Created PWA](#link-to-the-created-pwa)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [PWA Service Worker](#pwa-service-worker)
- [License](#license)

## Link to the Created PWA

[Gregor at GitHub Pages](https://release-candidate.github.io/Gregor/http/index.html)

## Usage

```bash
% npm install
```

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
- `npm run build` - Builds the app for production to the `./http` folder. To be used with a local `npm run preview`.
- `npm run build-github` - Builds the app for production and hosting at GitHub pages to the `./http` folder.
- `npm run preview` - Run the app in production mode. Open [https://localhost:4173](https://localhost:4173) to view it in the browser. Only works with certificate files `../https_cert-key.pem` and `../https_cert.pem`. See [./vite.config.ts](./vite.config.ts):

  ```javascript
  server: {
            https: {
                key: fs.readFileSync("../https_cert-key.pem"),
                cert: fs.readFileSync("../https_cert.pem"),
            },
        },
  ```

- `npm run test` - Run the Mocha tests.

## PWA Service Worker

The biggest challenge is to get all the used assets cached in the service worker of the PWA for offline use. The configuration of `vite-plugin-pwa` is contained in [./vite.config.ts](./vite.config.ts)

```javascript
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import solid from "vite-plugin-solid";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    let pwaServerPath = env.VITE_PWA_SERVER_PATH;
    if (pwaServerPath == null) {
        pwaServerPath = "/Gregor/http/";
    }
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
```

## License

Gregor is licensed under the AGPLv3 and later. See file [./LICENSE](./LICENSE) for details.
