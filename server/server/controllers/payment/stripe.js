import stripe from "stripe";
import uuid from "uuid/v4";
import Employer from "../../models/employer/basic.model";
import Cart from "../../models/employer/cart.model";
import { getPurchasedEmployee } from "../utils/getemployee";

const _stripe = stripe(process.env.STRIPE_API_SECRET_KEY);
const stripePay = async (req, res) => {
  const { product, token, id, employeeID } = req.body;
  console.log("data from frontend", token, product);
  const idempotencyKey = uuid();
  console.log("uuid generated key ==> ", idempotencyKey);
  try {
    let customer = await _stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    await _stripe.charges.create(
      {
        amount: 8 * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Buy Employee Profile",
      },
      { idempotencyKey }
    );
    let employer = await Employer.findById(id);
    employer.interestedEmployees.push(employeeID);
    await employer.save();
    let purchased = true;
    return await getPurchasedEmployee(req, res, employeeID, purchased);
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      error: "there happens error for dealing",
    });
  }
};

const charge = async (req, res) => {
  const { product, token, id, purchasenum, employees } = req.body;
  console.log("data from frontend", token, product);
  const idempotencyKey = uuid();
  console.log("uuid generated key ==> ", idempotencyKey);
  let addnum = 0;
  let emp_leng = employees ? employees.length : 0;
  if (purchasenum < 10) {
    addnum = purchasenum - emp_leng;
  } else if (purchasenum < 20) {
    addnum = purchasenum + 4 - emp_leng;
  } else if (purchasenum < 50) {
    addnum = purchasenum + 8 - emp_leng;
  } else {
    addnum = purchasenum + 25 - emp_leng;
  }

  console.log("purchasenum", purchasenum);
  try {
    let customer = await _stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    console.log("customer created", customer);
    await _stripe.charges.create(
      {
        amount: 8 * 100 * purchasenum,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Buy Employee Profile",
      },
      { idempotencyKey }
    );
    console.log("after charges");
    let [employer, cart] = [
      await Employer.findById(id),
      await Cart.findOne({ employerID: id }),
    ];
    console.log(employer, cart);
    let newCartItems = cart.cartItems.filter(
      (item) => !employees.includes(item._id.toString())
    );
    cart.cartItems = newCartItems;
    employer.canPurchaseFreeNum += addnum;
    if (emp_leng > 0) {
      employer.interestedEmployees = [
        ...employer.interestedEmployees,
        ...employees,
      ];
    }
    [await employer.save(), await cart.save()];
    return res.status(200).json({
      canPurchaseFreeNum: employer.canPurchaseFreeNum,
      cartItems: cart.cartItems,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      error: "there happens error for dealing",
    });
  }
};

export default { stripePay, charge };
