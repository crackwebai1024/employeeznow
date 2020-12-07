import stripe from "stripe";
import uuid from "uuid/v4";
import Employer from "../../models/employer/basic.model";
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
  const { product, token, id, purchasenum } = req.body;
  console.log("data from frontend", token, product);
  const idempotencyKey = uuid();
  console.log("uuid generated key ==> ", idempotencyKey);
  let addnum = 0;
  if (purchasenum < 10) {
    addnum = purchasenum;
  } else if (purchasenum < 20) {
    addnum = purchasenum + 4;
  } else if (purchasenum < 50) {
    addnum = purchasenum + 8;
  } else {
    addnum = purchasenum + 25;
  }

  try {
    let customer = await _stripe.customers.create({
      email: token.email,
      source: token.id,
    });

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
    let employer = await Employer.findById(id);
    employer.canPurchaseFreeNum += addnum;
    await employer.save();
    return res.status(200).json({
      canPurchaseFreeNum: employer.canPurchaseFreeNum,
    });
  } catch (err) {
    return res.status(403).json({
      error: "there happens error for dealing",
    });
  }
};

export default { stripePay, charge };
