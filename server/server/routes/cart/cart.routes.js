import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import cartCtrl from "../../controllers/cart/cart";
import EmpCtrl from "../../controllers/crud/employer/employer.crud";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const { addToCart, readFromCart, deleteByID, addToInterest } = cartCtrl;
const { updateByID } = EmpCtrl;
// add one employee to the shopping cart
router.route("/addtocart").post(requireSignin, hasAuthorization, addToCart);

// get all employees in the shopping cart
router.route("/read").get(requireSignin, hasAuthorization, readFromCart);

// delete one employee in the shopping cart by id
router.route("/deleteone").post(requireSignin, hasAuthorization, deleteByID);

// get profile by using canpurchasable freenum
router.route("/purchase").post(requireSignin, hasAuthorization, addToInterest);

// //charge 14 purchasable number by paying prices of 10 profiles
// //charge 28 purchasable number by paying prices of 20 profiles
// //charge 75 purchasable number by paying prices of 50 profiles
// router.route("/charge").post(requireSignin, hasAuthorization, updateByID);

export default router;
