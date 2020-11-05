import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export default class TakeMoney extends React.Component {
  onToken = (token) => {
    console.log("this is token", token);
    axios
      .post("http://localhost:8000/api/payment/purchase", {
        token,
      })
      .then((response) => {
        console.log("response ==> ", response);
      });
  };

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_51HhcEXCIGo4tK7NRNykvRQm7Fr7u0blan6LG7isRYcysKIwm8EmIRsNEWdXAI443QiNenx4URHSQUSWqsCCG8aDo006YUX2lOa"
      />
    );
  }
}
