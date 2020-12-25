import Employer from "../../models/employer/basic.model";
import Cart from "../../models/employer/cart.model";
import SearchResult from "../../models/employer/searchresult.model";
import CRUD from "../utils/general";

const addToCart = async (req, res) => {
  const employerID = req.body.id;
  const employeeID = req.body.employeeID;
  const filterID = req.body.filterID;
  try {
    const searchRes = await SearchResult.findOne({ filterID });
    console.log("after filterID", searchRes);
    const addCartItem = searchRes.searchresult.filter((item) => {
      if (item._id == employeeID) {
        console.log("before set false", item);
        item.incart = true;
        return item;
      }
    });
    await searchRes.save();
    let employerCart = await Cart.findOne({ employerID });
    if (!employerCart) {
      employerCart = new Cart({
        cartItems: [],
        employerID,
      });
    }
    employerCart.cartItems.push(addCartItem[0]);
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

const readFromCart = async (req, res) => {
  const role = "employerID";
  const [result, employer] = [
    await CRUD.find_ByID(Cart, role, req.query.id, res),
    await CRUD.find_ByID(Employer, "_id", req.query.id, res),
  ];
  if (result) {
    return res.status(200).json({
      cartItems: result.cartItems,
      freeNum: employer.canPurchaseFreeNum,
    });
  } else {
    return res
      .status(200)
      .json({ cartItems: result, freeNum: employer.canPurchaseFreeNum });
  }
};

const deleteByID = async (req, res) => {
  const employeeID = req.body.employeeID;
  const employerID = req.body.id;
  try {
    const cartByID = await Cart.findOne({ employerID });
    const newCartItems = cartByID.cartItems.filter((item) => {
      return item._id != employeeID;
    });
    cartByID.cartItems = newCartItems;
    await cartByID.save();
    return res.status(200).json({
      cartItems: newCartItems,
    });
  } catch (err) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const addToInterest = async (req, res) => {
  const employees = req.body.employees;
  try {
    const [employer, cartItem] = [
      await Employer.findById(req.body.id),
      await Cart.findOne({ employerID: req.body.id }),
    ];
    console.log(employer);
    employer.interestedEmployees = [
      ...employer.interestedEmployees,
      ...employees,
    ];
    if (employer.canPurchaseFreeNum < employees.length) {
      return res.status(500).json({
        error: "invalid request count error",
      });
    }
    employer.canPurchaseFreeNum -= employees.length;
    let removedItems = cartItem.cartItems.filter(
      (employee) => !employees.includes(employee._id.toString())
    );
    console.log(removedItems.length);
    cartItem.cartItems = removedItems;
    console.log("here");
    [(await employer.save(), await cartItem.save())];
    return res.status(200).json({
      canPurchaseFreeNum: employer.canPurchaseFreeNum,
      cartItems: cartItem.cartItems,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default { addToCart, readFromCart, deleteByID, addToInterest };
