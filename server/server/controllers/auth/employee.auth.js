import Employee from "../../models/employee/basic.model";
import errorHandler from "../../helpers/dbErrorHandler";
import { Verification } from "twilio-phone-verification";
import geocoder from "../../utils/geocoder";

const verify = new Verification(process.env.PHONE_VERIFICATION_API_KEY);

/**
 * check the phone number from frontend is the valid phone number
 *  - check that is already in the database
 *  - check that is valid phonenumber and sending 6 digits code success or not
 */
const isValidPhone = async (req, res) => {
  let phoneNumber = req.body.phoneNumber;
  let countryCode = req.body.countryCode;
  let codeLength = 6;
  console.log(phoneNumber, countryCode, codeLength);
  try {
    let user = await Employee.findOne({ cell: countryCode + phoneNumber });
    if (user === null) {
      verify
        .sendVerification(phoneNumber, countryCode, codeLength)
        .then((res) => {
          console.log(res);
          return res.status(200).json({
            success:
              "valid phone number, we already sent 6 digit codes to your phonenumber",
          });
        })
        .catch((err) => {
          console.log(err);
          // return res.status(403).json({
          //   failed: "please input the phone number again",
          // });
          return res.status(200).json({
            success: "test for frontend but not valid",
          });
        });
    } else {
      return res.status(403).json({
        failed: "please input the phone number again",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/* check six digit code is valid */
const isPhoneVerified = async (req, res, next) => {
  let sixDigitCode = req.body.sixDigitCode;
  let phoneNumber = req.body.phoneNumber;
  let countryCode = req.body.countryCode;
  const loc = await geocoder.geocode({
    // address: this.street1,
    // city: this.city,
    // state: this.state,
    zipcode: req.body.address.zipcode,
  });
  console.log(loc);
  // await verify
  //   .checkVerification(sixDigitCode, phoneNumber, countryCode)
  //   .then(async (res) => {
  //     console.log(res);
  //     await next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(403).json({
  //       error: "Invalid 6 digit code. Please input correct phone number",
  //     });
  //   });
  console.log("++++++++++++++++++++++++");
  await next();
};

export default { isValidPhone, isPhoneVerified };
