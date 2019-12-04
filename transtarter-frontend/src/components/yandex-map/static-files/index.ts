/* eslint-disable */
// Prefixing with ! will disable all configured normal loaders https://webpack.js.org/concepts/loaders/
export const iframeStyles = require('!css-loader!sass-loader!./iframeMapStyles.scss').toString()
export const geolocationControlLayout = require('html-loader?minimize!./geolocation-control-layout.html')
export const zoomControlLayout = require('html-loader?minimize!./zoom-control-layout.html')
