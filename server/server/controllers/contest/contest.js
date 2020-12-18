import Video from "../../models/employee/video.model";

// get all video
const readAllVideo = async (req, res) => {
  try {
    const videos = await Video.find();
    return res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

// vote video with stars
const voteVideo = async (req, res) => {
  try {
    let video = await Video.findById(req.body.videoID);
    let idx = video.voters.findIndex((item) => {
      return item.role === req.body.role && item.voterID === req.body.id;
    });
    if (idx > -1) {
      video.stars = video.stars - video.voters[idx].stars + req.body.stars;
      video.voters[idx].stars = req.body.stars;
      if (req.body.stars === 0) {
        video.voters.splice(idx, 1);
      }
    } else {
      if (req.body.stars !== 0) {
        video.voters.push({
          role: req.body.role,
          voterID: req.body.id,
          stars: req.body.stars,
        });
        video.stars += req.body.stars;
      }
    }
    await video.save();
    return res.status(200).json(video);
  } catch (err) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

// search video by contester's last name
const searchByLName = async (req, res) => {
  let lastName = req.body.lastName;
  let videotype = req.body.type;
  let lnreg = new RegExp(lastName, "i");
  try {
    let videodata = await Video.aggregate([
      { $match: { type: { $eq: videotype } } },
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "contester",
        },
      },
      { $unwind: "$contester" },
      {
        $project: {
          _id: 1,
          fname: 1,
          url: 1,
          updatedAt: 1,
          stars: 1,
          voters: 1,
          "contester.lastName": 1,
        },
      },
      {
        $addFields: {
          match: {
            $regexMatch: {
              input: "$contester.lastName",
              regex: lnreg,
            },
          },
        },
      },
      {
        $match: {
          match: true,
        },
      },
      {
        $project: {
          match: 0,
        },
      },
    ]);
    return res.status(200).json(videodata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
};
export default { readAllVideo, voteVideo, searchByLName };
