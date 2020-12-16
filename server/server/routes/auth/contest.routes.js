import express from "express";
import authVoterCtrl from "../../controllers/auth/voter.auth";

const router = express.Router();
const { isValidEmail } = authVoterCtrl;

// check if the voter email is used before
router.route("/isvalidemail").post(isValidEmail);

export default router;
