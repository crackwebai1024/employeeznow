const nodeGeocoder = require("node-geocoder");

// const options = {
//   provider: process.env.GEOCODER_PROVIDER,
//   httpAdapter: "https",
//   apiKey: process.env.GEOCODER_API_KEY,
//   formatter: null,
// };

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "AFgkJwzGrAxYndHZpJqQexN2K3kZnvsN",
  formatter: null,
};

var geocoder = nodeGeocoder(options);

module.exports = geocoder;
