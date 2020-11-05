import stripe from "stripe";
import uuid from "uuid/v4";

const _stripe = stripe(
  "sk_test_51HhcEXCIGo4tK7NRubE0BTJgBGP0vaYGYGRtErc0xUUTA8c7uuOLSK2ws1EDnkxDiwG4TDsWC93HMBw5PGhkP3W300bk8txj5z"
);

const stripePay = async (req, res) => {
  const { product, token } = req.body;
  console.log("data from frontend", token, product);
  const idempotencyKey = uuid();
  console.log("uuid generated key ==> ", idempotencyKey);
  try {
    await _stripe.customers.create({ email: token.email, source: token.id });
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
    return res.status(200).json({
      success: "payment success",
    });
  } catch (err) {
    return res.status(403).json({
      error: "there happens error for dealing",
    });
  }
  // return _stripe.customers
  //   .create({
  //     email: token.email,
  //     source: token.id,
  //   })
  //   .then(async (customer) => {
  //     try {
  //       await _stripe.charges.create(
  //         {
  //           amount: 8 * 100,
  //           currency: "usd",
  //           customer: customer.id,
  //           receipt_email: token.email,
  //           description: "Buy Employee Profile",
  //         },
  //         { idempotencyKey }
  //       );
  //       console.log("success");
  //     } catch (err) {
  //       console.log("error happened in stripe charge", err);
  //     }
  //   })
  //   .then((result) => res.status(200).json(result))
  //   .catch((err) => console.log(err));
};

export default { stripePay };
