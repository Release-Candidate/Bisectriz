# Bisectriz PWA

![Bisectriz logo](./public/icons/icon-192.png)

- [Link to the Created PWA](#link-to-the-created-pwa)
- [Usage](#usage)
  - [Available Scripts](#available-scripts)
- [License](#license)

## Link to the Created PWA

[Bisectriz at GitHub Pages](https://release-candidate.github.io/Bisectriz/http/)

## Usage

```bash
% npm install --save-dev
```

### Available Scripts

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

## License

Bisectriz is licensed under the AGPLv3 and later. See file [./LICENSE](./LICENSE) for details.
