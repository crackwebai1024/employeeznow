import Employee from "../../../models/employee/basic.model";
import CRUD from "../utils/general";

const create = async (req, res, next) => {
  await CRUD.create(Employee, req, res, next);
};

const find_ByID = async (req, res) => {
  let role = "_id";
  let userBasicByID = await CRUD.find_ByID(Employee, role, req.query.id, res);
  return userBasicByID;
};

const updateByID = async (req, res) => {
  let role = "_id";
  await CRUD.updateByID(Employee, role, req.body.id, req, res);
};

export default { create, find_ByID, updateByID };
