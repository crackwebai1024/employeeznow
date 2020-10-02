import express from "express";
import authEmployeeCtrl from "../../controllers/auth/employee.auth";
import authCommonCtrl from "../../controllers/auth/common.auth";

const router = express.Router();
const { isPhoneVerified, isValidPhone, isValidEmail } = authEmployeeCtrl;
const { create, signIn } = authCommonCtrl;
router.route("/isvalidemail").post(isValidEmail);
router.route("/isvalidphone").get(isValidPhone);
router.route("/isphoneverified").post(isPhoneVerified, create, signIn);

export default router;
