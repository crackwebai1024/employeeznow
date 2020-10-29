import Employer from "../../models/employer/basic.model";
import EmpeeCtrl from "../../controllers/crud/employee/main.crud";
import errorHandler from "../../helpers/dbErrorHandler";

const getPurchaseRequest = async (req, res) => {
  const employeeID = req.body.employeeID;
  const employerID = req.body.id;
  try {
    //find the employer by id from database
    let employer = await Employer.findById(employerID);
    // check if the number of employee that employer bought is more than 4
    if (employer.interestedEmployees.length < 4) {
      employer.interestedEmployees.push(employeeID);

      //   update employer and save
      req.query = {};
      req.query.id = employeeID;
      await employer.save();

      //   find whole employee data from employee database
      await EmpeeCtrl.read(req, res);
    } else {
      return res.status(200).json({
        data: "Your interest number limited. Please purchase with payment.",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { getPurchaseRequest };
