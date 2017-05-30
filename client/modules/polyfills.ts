// -----------------------------
// Application Polyfills
// -----------------------------
import 'core-js'
import 'zone.js'
import 'rxjs'

// -----------------------------
// Webpack Polyfills
// -----------------------------

// -----------------------------
// Import Svg
// -----------------------------

var __svg__ = { path: './global/icons/**/*.svg', name: 'icons/all.svg' }
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)

// -----------------------------
// Image Public Path Fix
// -----------------------------
/* eslint-disable */
__webpack_public_path__ = process.env.NODE_ENV === 'production' ? process.env.CDN_URL + '/' + process.env.CDN_VERSION + '/' : window.location.protocol + '//' + window.location.host + '/'
/* eslint-enable */
