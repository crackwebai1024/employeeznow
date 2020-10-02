var AWS = require("aws-sdk");
var fs = require("fs");

// For dev purposes test only
AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
});

var s3 = new AWS.S3();

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
  let bucketName = "employeeznow" + req.body.type;
  let fileName = req.body.id + req.body.fname;
  let fcont = req.file;

  const params = {
    Bucket: bucketName,
    Key: fileName,
  };
  var base64data = new Buffer(fcont.buffer, "binary");
  s3.putObject(
    {
      Bucket: "employeeznowresume",
      Key: fileName,
      Body: base64data,
      ACL: "public-read",
    },
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "there is an error in saving data to S3",
        });
      }
      return res.status(200).json({
        file: "upload success",
      });
    }
  );
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
