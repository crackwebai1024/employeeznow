import Employer from "../../models/employer/basic.model";
import Cart from "../../models/employer/cart.model";
import SearchResult from "../../models/employer/searchresult.model";

const addToCart = async (req, res) => {
  const employerID = req.body.id;
  const employeeID = req.body.employeeID;
  const filterID = req.body.filterID;
  try {
    const searchRes = await SearchResult.findOne({ filterID });
    console.log("after filterID", searchRes);
    const addCartItem = searchRes.searchresult.filter((item) => {
      return item._id == employeeID;
    });
    console.log("add cart item", addCartItem);
    let employerCart = await Cart.findOne({ employerID });
    if (!employerCart) {
      employerCart = new Cart({
        cartItems: [],
        employerID,
      });
    }
    console.log("after employerID");
    employerCart.cartItems.push(addCartItem);
    await employerCart.save();
    return res.status(200).json({
      cartItems: employerCart.cartItems,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server Error",
    });
  }
};

export default { addToCart };
