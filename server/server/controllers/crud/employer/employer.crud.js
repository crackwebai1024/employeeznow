import Employer from "../../../models/employer/basic.model";
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

export default { find_ByID, updateByID };
