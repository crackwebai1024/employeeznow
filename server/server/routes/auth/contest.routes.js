import express from "express";
import authVoterCtrl from "../../controllers/auth/voter.auth";
import authEmployeeCtrl from "../../controllers/auth/employee.auth";
import authCommonCtrl from "../../controllers/auth/common.auth";

const router = express.Router();
const { isPhoneVerified, isValidPhone } = authEmployeeCtrl;
const { isValidEmail } = authVoterCtrl;
const { create, signIn } = authCommonCtrl;

// check if the voter email is used before
router.route("/isvalidemail").post(isValidEmail);

/**
 * check the phone number is the valid phone number
 *  - check that is already in the database
 *  - check that is valid phonenumber and sending 6 digits code success or not
 */
router.route("/isvalidphone").post(isValidPhone);

// check six digit code is valid
router.route("/isphoneverified").post(isPhoneVerified, create, signIn);

export default router;
