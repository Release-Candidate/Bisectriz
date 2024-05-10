/*
 * SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Gregor
 * File:     sw.js
 * Date:     25.Oct.2023
 *
 * ==============================================================================
 */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

/**
 * `version` is the name of the cache, including a timestamp.
 * This is filled by `vite` when copying `sw.js` to the directory `http`.
 */
const version = "Gregor-" + APP_VERSION;

/**
 *  `manifest` is an array holding the paths to all files to cache.
 *  This is changed against the real list of files by the `vite-plugin-pwa`,
 *  configured in `../vite.config.ts`
 */
const manifest = VITE_PLUGIN_MANIFEST.map((e) => PWA_SERVER_PATH + e.url);

/*
 * ==============================================================================
 *  Installation
 */

/**
 * Install the service worker.
 * On installation, all files Parcel knows about are added to the cache.
 */
async function install() {
    const cache = await caches.open(version);
    await cache.addAll(manifest);
    // eslint-disable-next-line no-console
    console.log(`[Service Worker] installed files to ${version}`);
}

addEventListener("install", (event) => {
    event.waitUntil(install());
});

/*
 * ==============================================================================
 *  Activation
 */

/**
 * Activate service worker.
 * On activation all files from older versions of the cache are deleted.
 */
async function activate() {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => key !== version && caches.delete(key)));
    // eslint-disable-next-line no-console
    console.log(`[Service Worker] activated`);
}

addEventListener("activate", (event) => event.waitUntil(activate()));

/*
 * ==============================================================================
 *  Fetching
 */

/**
 * Fetches the given URL, either from cache or the server.
 * @param {RequestInfo} request The request to fulfill.
 * @returns {Response} The fetched URL as `Response`.
 */
async function fetchFromCache(request) {
    const cachedResponse = await caches.match(request, {
        ignoreSearch: true,
    });
    if (cachedResponse) {
        // eslint-disable-next-line no-console
        console.log(`[Service Worker] cache hit: ${request.url}`);
        return cachedResponse;
    }
    // eslint-disable-next-line no-console
    console.log(`[Service Worker] fetching ${request.url}`);

    const response = await fetch(request).catch(return404);
    if (response.ok) {
        return response;
    }
    // eslint-disable-next-line no-console
    console.log(`[Service Worker] haven't found ${request.url}`);
    return return404("URL not found");
}

addEventListener("fetch", (event) =>
    event.respondWith(fetchFromCache(event.request)),
);

/**
 * ==============================================================================
 *  Return the 404 error page.
 */

/**
 * Return the 404 error page.
 * @param {string} err
 * @returns {Promise<Response | undefined>} The 404 HTML page if cached.
 */
async function return404(err) {
    // eslint-disable-next-line no-console
    console.log(`[Service Worker] Error: "${err}"`);
    return caches.match("/404.html");
}
