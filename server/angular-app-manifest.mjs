
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/watch-store/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/watch-store/watches",
    "route": "/watch-store"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-6FOS2TNK.js",
      "chunk-EBJGMKDT.js"
    ],
    "route": "/watch-store/watches"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-LFDQGQSS.js",
      "chunk-EBJGMKDT.js"
    ],
    "route": "/watch-store/watches/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-7GYI6RFY.js"
    ],
    "route": "/watch-store/cart"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-44EO3AWK.js"
    ],
    "route": "/watch-store/checkout"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZM5ZTXDK.js",
      "chunk-EBJGMKDT.js"
    ],
    "route": "/watch-store/admin"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5294, hash: 'cd289336b239f89d8a155453561133d9037cf56ebc16b36d37cf51cb73b9cbc7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1266, hash: '9a30562c2c61438aa6a89d0b0b2f03ad784379d0b2ba908537ddc376e1c37359', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-5JK2XSVH.css': {size: 315868, hash: '91pp3YI0/pg', text: () => import('./assets-chunks/styles-5JK2XSVH_css.mjs').then(m => m.default)}
  },
};
