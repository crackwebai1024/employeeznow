import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import cartCtrl from "../../controllers/cart/cart";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const { addToCart, readFromCart, deleteByID } = cartCtrl;

// add one employee to the shopping cart
router.route("/addtocart").post(requireSignin, hasAuthorization, addToCart);

// get all employees in the shopping cart
router.route("/read").get(requireSignin, hasAuthorization, readFromCart);

// delete one employee in the shopping cart by id
router.route("/deleteone").post(requireSignin, hasAuthorization, deleteByID);

export default router;
