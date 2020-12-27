import Employee from "../../models/employee/basic.model";
import Voter from "../../models/contest/voter.model";
import axios from "axios";

// check if the voter email is used before
const isValidEmail = async (req, res) => {
  const v3url = "https://api.sendgrid.com/v3/validations/email";
  const headers = {
    headers: {
      Authorization:
        "Bearer " + process.env.SENDGRID_EMAIL_ADDRESS_VALIDATION_KEY,
    },
  };
  const confbody = {
    email: req.body.email,
  };
  try {
    let isEmailAddressExist = await axios.post(v3url, confbody, headers);
    console.log(isEmailAddressExist.data.result);
    if (isEmailAddressExist.data.result.verdict !== "Valid") {
      return res.status("403").json({
        failed: "invalid email",
      });
    }
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
        failed: "email is already used as an employee or a voter",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status("500").json({
      error: "server error",
    });
  }
};

export default { isValidEmail };
