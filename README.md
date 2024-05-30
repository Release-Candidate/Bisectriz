# Bisectriz PWA

Bisectriz is a PWA template for VIte, TailwindCSS and Solid.js. This being a PWA means, that you can install the website like an app and use offline.

- [Link to the Created PWA](#link-to-the-created-pwa)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [PWA Service Worker](#pwa-service-worker)
- [License](#license)
- [Certificates](#certificates)
  - [Step #1 - Create Root CA Certificate and Key](#step-1---create-root-ca-certificate-and-key)
    - [Step 1.1 - Generate Root CA Private Key](#step-11---generate-root-ca-private-key)
    - [Step 1.2 - Generate Root CA Certificate](#step-12---generate-root-ca-certificate)
      - [Sample Input Values for the CA Certificate](#sample-input-values-for-the-ca-certificate)
  - [Step #2 - Create Server Certificate and Key](#step-2---create-server-certificate-and-key)
    - [Step 2.1 - Generate Server Private Key and Server CSR](#step-21---generate-server-private-key-and-server-csr)
  - [Step 2.2 - Server Certificate Creation and Signing using CA Key](#step-22---server-certificate-creation-and-signing-using-ca-key)

## Link to the Created PWA

[Bisectriz at GitHub Pages](https://release-candidate.github.io/Bisectriz/http/index.html)

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
        pwaServerPath = "/Bisectriz/http/";
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

Bisectriz is licensed under the AGPLv3 and later. See file [./LICENSE](./LICENSE) for details.

## Certificates

How to generate a key file and certificate signed with that key file: [How to create self-signed SSL TLS X.509 certificates using OpenSSL](https://www.bastionxp.com/blog/how-to-create-self-signed-ssl-tls-x.509-certificates-using-openssl/).

The two files to use in the TLS server are the certificate [./tls_cert/ca-cert.pem](./tls_cert/ca-cert.pem) and the key [./tls_cert/ca-key.pem](./tls_cert/ca-key.pem).
In the Go code:

```go
server.ListenAndServeTLS("./tls_cert/ca-cert.pem", "./tls_cert/ca-key.pem")
```

### Step #1 - Create Root CA Certificate and Key

#### Step 1.1 - Generate Root CA Private Key

We’ll generate a RSA type private key that is 2048 bits in length. Longer the key, harder it becomes to crack the key, and therefore more secure.

```text
openssl genrsa -out ca-key.pem 2048
```

#### Step 1.2 - Generate Root CA Certificate

Now, let’s generate the CA certificate using the CA private key generated in the previous step. The certificate will be valid for next 3650 days (10 years).

```text
openssl req -new -x509 -nodes -days 3650 -key ca-key.pem -out ca-cert.pem
```

The above command will prompt you for additional details about your company, org, internal domain name of the CA for which the certificate is being requested.

##### Sample Input Values for the CA Certificate

You are about to be asked to enter information that will be incorporated into your certificate request. What you are about to enter is what is called a Distinguished Name or a DN. There are quite a few fields but you can leave some blank For some fields there will be a default value, If you enter '.', the field will be left blank.

```text
Country Name (2 letter code) []:AT
State or Province Name (full name) []:Styria
Locality Name (eg, city) []:Hart bei Graz
Organization Name (eg, company) []:Knapp
Organizational Unit Name (eg, section) []:DINSS
Common Name (eg, fully qualified host name) []:base5-repo.knapp.at
Email Address []:NAME@knapp.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
```

### Step #2 - Create Server Certificate and Key

#### Step 2.1 - Generate Server Private Key and Server CSR

The following command will create a new server private key and a server certificate signing request(CSR). Valid for 10 years.

```text
openssl req -newkey rsa:2048 -nodes -days 3650 -keyout server-key.pem -out server-req.pem
```

The above command will prompt you for additional details about your company, org, internal domain name of the server for which the certificate is being requested.

Sample Input Values for the Server Certificate:

```text
Generating a 2048 bit RSA private key
................+++++
.....................................................+++++
writing new private key to 'server-key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:AT
State or Province Name (full name) []:Styria
Locality Name (eg, city) []:Hart bei Graz
Organization Name (eg, company) []:Knapp
Organizational Unit Name (eg, section) []:DINSS
Common Name (eg, fully qualified host name) []:base5-repo.knapp.at
Email Address []:NAME@knapp.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:Knapp
```

### Step 2.2 - Server Certificate Creation and Signing using CA Key

We’ll use the CAKey and CA cert file to sign the server CSR, valid for 10 years.

```text
openssl x509 -req -days 3650 -set_serial 01 \
   -in server-req.pem \
   -out server-cert.pem \
   -CA ca-cert.pem \
   -CAkey ca-key.pem \
   -extensions SAN   \
   -extfile <(printf "\n[SAN]\nsubjectAltName=DNS:base5-repo.knapp.at\nextendedKeyUsage=serverAuth")
```
