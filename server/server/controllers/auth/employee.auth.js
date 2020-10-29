import Employee from "../../models/employee/basic.model";
import errorHandler from "../../helpers/dbErrorHandler";
import { Verification } from "twilio-phone-verification";
import geocoder from "../../utils/geocoder";
import authy from "authy";

console.log(process.env.AUTHY_API_KEY);
const _authy = authy(process.env.AUTHY_API_KEY);

// const verify = new Verification(process.env.PHONE_VERIFICATION_API_KEY);

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
      _authy
        .phones()
        .verification_start(
          phoneNumber,
          countryCode,
          { via: "sms", locale: "en", code_length: "6" },
          function (err, resp) {
            if (err) {
              console.log(err);
              return res.status(403).json({
                failed: "please input the phone number again",
              });
            }
            return res.status(200).json({
              success:
                "valid phone number, we already sent 6 digit codes to your phonenumber",
            });
          }
        );
      //   verify
      //     .sendVerification(phoneNumber, countryCode, codeLength)
      //     .then((res) => {
      //       console.log(res);
      //       return res.status(200).json({
      //         success:
      //           "valid phone number, we already sent 6 digit codes to your phonenumber",
      //       });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       // return res.status(403).json({
      //       //   failed: "please input the phone number again",
      //       // });
      //       return res.status(200).json({
      //         success: "test for frontend but not valid",
      //       });
      //     });
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
  // _authy.phones().verification_check(phoneNumber, countryCode, sixDigitCode, function (err, res) {
  //   if(err){
  //     return res.status(403).json({
  //       error: "phone verification failed"
  //     })
  //   }
  //   await next()
  // });

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
  await next();
};

export default { isValidPhone, isPhoneVerified };
