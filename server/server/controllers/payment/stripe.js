import stripe from "stripe";
import uuid from "uuid/v4";

const stripe = stripe(
  "pk_test_51HhcEXCIGo4tK7NRP4agNSjjFC7LYGA6FQTl668yKHMv2ixnMbwUF5wK8F0AiruxMqn6sMoUJ5U92tV750uuabZ2008aPicqDP"
);

const stripePay = async (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT ==> ", product);
  console.log("PRICE ==> ", product.price);
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: 8 * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: "Buy Employee Profile",
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

export default { stripePay };
