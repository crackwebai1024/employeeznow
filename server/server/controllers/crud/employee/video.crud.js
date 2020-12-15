import ContVideo from "../../../models/employee/video.model";
import CRUD from "../../utils/general";
import extend from "lodash/extend";

const find_ByID = async (req, res) => {
  try {
  } catch (err) {}
};

const updateByID = async (req, res) => {
  let bucketName = process.env.AWS_BUCKET_NAME;
  let fileName = req.body.id + req.body.type;
  req.body.updatedAt = Date.now();
  req.body.url = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  try {
    let video = await ContVideo.findOne({
      employee: req.body.id,
      type: req.body.type,
    });
    req.body.employee = req.body.id;

    if (!video) {
      let newVideo = new ContVideo(req.body);
      await newVideo.save();
      return res.status(200).json(newVideo);
    } else {
      console.log("updatedvideo");
      video = extend(video, req.body);
      await video.save();
      return res.status(200).json(video);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const deleteByID = async (req, res) => {
  try {
    let video = await ContVideo.findOne({
      employee: req.body.id,
      type: req.body.type,
    });
    req.body.fname = "";
    req.body.url = "";
    req.body.updatedAt = Date.now();
    req.body.type = "";
    req.body.stars = "";
    req.body.employee = req.body.id;
    req.body.voters = [];
    video = extend(video, req.body);
    await video.save();
    return res.status(200).json(video);
  } catch (err) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

export default { updateByID, find_ByID, deleteByID };
