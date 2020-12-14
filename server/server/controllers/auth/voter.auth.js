import Employee from "../../models/employee/basic.model";
import Voter from "../../models/contest/voter.model";

// check if the voter email is used before
const isValidEmail = async (req, res) => {
  try {
    let [user, voter] = [
      await Employee.findOne({
        email: req.body.email,
      }),
      await Voter.findOne({
        email: req.body.email,
      }),
    ];
    if (!user && !voter) {
      return res.status("200").json({
        success: "valid email",
      });
    } else {
      return res.status("403").json({
        failed: "invalid email",
      });
    }
  } catch (err) {
    return res.status("500").json({
      error: "server error",
    });
  }
};

export default { isValidEmail };
