import Employer from "../../models/employer/basic.model";
import { getPurchasedEmployee } from "../utils/getemployee";
import Cart from "../../models/employer/cart.model";

const getEmployeeData = async (req, res) => {
  let employerID = req.query.id;
  let id = req.query.employeeID;
  let purchased = false;
  let inCart = false;
  try {
    const [employer, employeesInCart] = [
      await Employer.findById(employerID),
      await Cart.findOne({ employerID }),
    ];
    const inCartIds = [];
    if (employeesInCart) {
      employeesInCart.cartItems.forEach((item) => {
        inCartIds.push(item._id.toString());
      });
    }
    let cartIdx = inCartIds.indexOf(id);
    if (cartIdx > -1) {
      inCart = true;
    }
    let idx = employer.interestedEmployees.indexOf(id);
    if (idx > -1) {
      purchased = true;
    }
    await getPurchasedEmployee(req, res, id, purchased, inCart);
  } catch (err) {
    return res.status(500).json({
      error: "server error",
    });
  }
};

export default { getEmployeeData };
