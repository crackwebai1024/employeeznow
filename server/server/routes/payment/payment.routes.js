// import PayPalCtrl from "../../controllers/payment/paypal";
import express from "express";
import PurchaseCtrl from "../../controllers/payment/purchase";
import authCtrl from "../../controllers/auth/common.auth";
import StripeCtrl from "../../controllers/payment/stripe";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const { stripePay, charge } = StripeCtrl;
const { getPurchaseRequest } = PurchaseCtrl;

// employee interest first step to check if the employee is in the interestedemployees list
router
  .route("/sendrequest")
  .post(requireSignin, hasAuthorization, getPurchaseRequest);

// if not buy the employee profile
router.route("/purchase").post(requireSignin, hasAuthorization, stripePay);

//charge 14 purchasable number by paying prices of 10 profiles
//charge 28 purchasable number by paying prices of 20 profiles
//charge 75 purchasable number by paying prices of 50 profiles
router.route("/charge").post(requireSignin, hasAuthorization, charge);

/* purchase employee by paypal 
// paypal payment request
router
  .route("/paypal/sendrequest")
  .post(requireSignin, hasAuthorization, getPaypalRequest);

// paypal payment success
router.route("/paypal/success").post(getPaypalSuccess);

// paypal payment cancel
router.route("/paypal/cancel").post(getPaypalCancel);
*/

export default router;
