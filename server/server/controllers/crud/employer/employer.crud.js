import Employer from "../../../models/employer/basic.model";
import Employee from "../../../models/employee/basic.model";
import CRUD from "../../utils/general";

const find_ByID = async (req, res) => {
  let role = "_id";
  let employerByID = await CRUD.find_ByID(Employer, role, req.query.id, res);
  return res.status(200).json({
    employer: employerByID,
  });
};

const updateByID = async (req, res) => {
  let role = "_id";
  await CRUD.updateByID(Employer, role, req.body.id, req, res);
};

const getAllPurchased = async (req, res) => {
  try {
    console.log(req.query);
    const employees = await Employer.find(
      { _id: req.query.id },
      "interestedEmployees"
    );
    console.log("search employees", employees[0].interestedEmployees);
    const purchased = await Employee.aggregate([
      {
        $match: {
          _id: { $in: employees[0].interestedEmployees },
        },
      },
      {
        $project: {
          salt: 0,
          hashed_password: 0,
          passwordChangedAt: 0,
          createdAt: 0,
        },
      },
      {
        $addFields: {
          purchased: true,
        },
      },
      {
        $lookup: {
          from: "employeeskills",
          localField: "_id",
          foreignField: "employee",
          as: "employeeskill",
        },
      },
      { $unwind: "$employeeskill" },
      {
        $lookup: {
          from: "employeepreferences",
          localField: "_id",
          foreignField: "employee",
          as: "employeepreference",
        },
      },
      {
        $lookup: {
          from: "employeeexperiences",
          localField: "_id",
          foreignField: "employee",
          as: "employeeexperience",
        },
      },
      { $unwind: "$employeepreference" },
      { $unwind: "$employeeexperience" },
      {
        $lookup: {
          from: "employeeimgs",
          localField: "_id",
          foreignField: "employee",
          as: "employeeimg",
        },
      },
    ]);
    return res.status(200).json({
      purchased,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default { find_ByID, updateByID, getAllPurchased };
