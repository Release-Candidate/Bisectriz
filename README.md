# Bisectriz PWA

[![Deploy PWA to Pages](https://github.com/Release-Candidate/Bisectriz/actions/workflows/pages.yaml/badge.svg)](https://github.com/Release-Candidate/Bisectriz/actions/workflows/pages.yaml)

![Bisectriz logo](./public/icons/icon-192.png)

A progressive web app to display the angle bisector of two angles given by zodiac sign, degrees and minutes.
The angle bisector of the two given angles is always calculated counterclockwise from the smaller to the bigger angle, the order in the input fields does not matter. The two angles are given as zodiac sign -- starting at aries (0°), ending at pisces (330°) -- the rest given in degrees between 0° and 29° (inclusive) and minutes between 0' and 59' (inclusive).

- [Link to the Created PWA](#link-to-the-created-pwa)
- [Usage](#usage)
  - [Available Scripts](#available-scripts)
- [License](#license)

## Link to the Created PWA

[Bisectriz at GitHub Pages](https://release-candidate.github.io/Bisectriz/)

## Usage

Install all development dependencies using `npm`:

```bash
% npm install --save-dev
```

### Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in the development mode. Open [https://localhost:5173](https://localhost:5173) to view it in the browser. Only works with certificate files `../https_cert-key.pem` and `../https_cert.pem`. See [./vite.config.ts](./vite.config.ts):
- `npm run build` - Builds the app for production to the `./http` folder. To be used with a local `npm run preview`.
- `npm run build-github` - Builds the app for production and hosting at GitHub pages to the `./http` folder.
- `npm run preview` - Run the app in production mode. Open [https://localhost:4173](https://localhost:4173) to view it in the browser. Only works with certificate files `../https_cert-key.pem` and `../https_cert.pem`. See [./vite.config.ts](./vite.config.ts):

  ```javascript
  server: {
            https: {
                key: fs.readFileSync("../localhost_https_cert-key.pem"),
                cert: fs.readFileSync("../localhost_https_cert.pem"),
            },
        },
  ```

- `npm run test` - Run the Mocha tests.

## License

Bisectriz is licensed under the AGPLv3 and later. See file [./LICENSE](./LICENSE) for details.
