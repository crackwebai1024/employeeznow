import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import cartCtrl from "../../controllers/cart/cart";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const { addToCart } = cartCtrl;
router.route("/addtocart").post(requireSignin, hasAuthorization, addToCart);

export default router;
