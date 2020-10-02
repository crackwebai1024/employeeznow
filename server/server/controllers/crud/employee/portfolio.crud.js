import EmployeePortfolio from "../../../models/employee/portfolio.model";
import CRUD from "../utils/general";

const create = async (req, res, next) => {
  await CRUD.create(EmployeePortfolio, req, res, next);
};

const find_ByID = async (req, res) => {
  let role = "employee";
  let portfolioByID = await CRUD.find_ByID(
    EmployeePortfolio,
    role,
    req.body.id,
    res
  );
  return portfolioByID;
};

export default { create, find_ByID };
