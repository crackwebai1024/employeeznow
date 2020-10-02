import express from "express";
import authCommonCtrl from "../../controllers/auth/common.auth";

const router = express.Router();
const { forgotPassword, resetPassword, signIn } = authCommonCtrl;

router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").patch(resetPassword);
router.route("/signin").post(signIn);

export default router;
