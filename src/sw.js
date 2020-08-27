importScripts("workbox-v5.1.3/workbox-sw.js");

workbox.setConfig({modulePathPrefix: 'workbox-v5.1.3/'})

const precacheManifest = [];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);