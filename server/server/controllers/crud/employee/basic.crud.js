import Employee from "../../../models/employee/basic.model";
import CRUD from "../utils/general";
import extend from "lodash/extend";

const create = async (req, res, next) => {
  await CRUD.create(Employee, req, res, next);
};

const find_ByID = async (req, res) => {
  console.log("----------", req.query.id);
  let role = "_id";
  let userBasicByID = await CRUD.find_ByID(Employee, role, req.query.id, res);
  return res.status(200).json({
    basic: userBasicByID,
  });
};

const updateByID = async (req, res) => {
  let role = "_id";
  await CRUD.updateByID(Employee, role, req.body.id, req, res);
};

const updatePWD = async (req, res) => {
  console.log(req.body);
  try {
    let user = await Employee.findOne({ _id: req.body.id });
    console.log(user);
    if (!user) {
      return res.status(403).json({
        error: "There is no such user",
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .json({ error: "Email and password don't match." });
    }
    let newpass = {};
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    // console.log("---------------------------");
    // user = extend(user, newpass);
    await user.save();
    return res.status(200).json({
      success: "set new password successfully",
    });
  } catch {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export default { create, find_ByID, updateByID, updatePWD };
