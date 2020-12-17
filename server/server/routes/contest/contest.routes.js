import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import contCtrl from "../../controllers/contest/contest";
const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const { readAllVideo, voteVideo, searchByLName } = contCtrl;

//get all videos, set the stars to the specific video as a voter
router.route("/votevideo").post(requireSignin, hasAuthorization, voteVideo);
router
  .route("/readvideo")
  .get(requireSignin, hasAuthorization, readAllVideo)
  .post(requireSignin, hasAuthorization, searchByLName);

export default router;
