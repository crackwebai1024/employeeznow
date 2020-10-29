// import PayPalCtrl from "../../controllers/payment/paypal";
import express from "express";
import PurchaseCtrl from "../../controllers/payment/purchase";
import authCtrl from "../../controllers/auth/common.auth";

const { requireSignin, hasAuthorization } = authCtrl;

const router = express.Router();
const { getPurchaseRequest } = PurchaseCtrl;

// employee interest
router
  .route("/sendrequest")
  .post(requireSignin, hasAuthorization, getPurchaseRequest);

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
