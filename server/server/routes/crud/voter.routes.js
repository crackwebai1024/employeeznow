import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import VoterCtrl from "../../controllers/crud/voter/voter.crud";

const router = express.Router();

const { requireSignin, hasAuthorization } = authCtrl;
const { find_ByID, updateByID } = VoterCtrl;

router
  .route("/")
  .get(requireSignin, hasAuthorization, find_ByID)
  .post(requireSignin, hasAuthorization, updateByID);

export default router;
