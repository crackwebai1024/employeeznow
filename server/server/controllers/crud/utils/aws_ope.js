var AWS = require("aws-sdk");
var fs = require("fs");

// For dev purposes test only
AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
});

const params = {
  Bucket: "newbucket111",
  Key: "del2.txt",
};

var s3 = new AWS.S3();
// Read in the file, convert it to base64, store to S3
fs.readFile("del.txt", function (err, data) {
  if (err) {
    throw err;
  }

  var base64data = new Buffer(data, "binary");

  s3.putObject(
    {
      Bucket: "newbucket111",
      Key: "del2.txt",
      Body: base64data,
      ACL: "public-read",
    },
    function (resp) {
      console.log(arguments);
      console.log("Successfully uploaded package.");
      s3download(params)
        .then((data) => {
          console.log("I am here");
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
});

const s3download = function (params) {
  return new Promise((resolve, reject) => {
    s3.getObject(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        console.log("Successfully dowloaded data from  bucket");
        resolve(data);
      }
    });
  });
};

const read = async (bucketName, fileName) => {
  return;
};

const save = async (req, res, next) => {
  // bucketName, fileName, fcont
  let bucketName = req.body.type;
  let fileName = req.body.id + req.body.fname;
  let fcont = req.file;
  next();
};

const update = async (req, res, next) => {
  let bucketName = req.body.type;
  let prevFName = req.body.prevFName;
  let newFName = req.body.newFName;
  let newFCont = req.file;
  next();
};

const del = async (req, res, next) => {
  let bucketName = req.body.bucketName;
  let fileName = req.body.fileName;
  next();
};

export default { read, save, update, del };
