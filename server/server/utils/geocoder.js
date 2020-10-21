const nodeGeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "AFgkJwzGrAxYndHZpJqQexN2K3kZnvsN",
  formatter: null,
};

var geocoder = nodeGeocoder(options);

module.exports = geocoder;
