// import PayPalCtrl from "../../controllers/payment/paypal";
import express from "express";
import PurchaseCtrl from "../../controllers/payment/purchase";
import authCtrl from "../../controllers/auth/common.auth";
import StripeCtrl from "../../controllers/payment/stripe";

const { requireSignin, hasAuthorization } = authCtrl;
const { stripePay } = StripeCtrl;
const router = express.Router();
const { getPurchaseRequest } = PurchaseCtrl;

// employee interest
router
  .route("/sendrequest")
  .post(requireSignin, hasAuthorization, getPurchaseRequest);

router.route("/purchase").post(stripePay);
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
