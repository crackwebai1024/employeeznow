import Voter from "../../../models/contest/voter.model";
import CRUD from "../../utils/general";

const find_ByID = async (req, res) => {
  let role = "_id";
  let voterByID = await CRUD.find_ByID(Voter, role, req.query.id, res);
  return res.status(200).json({
    voter: voterByID,
  });
};

const updateByID = async (req, res) => {
  let role = "_id";
  await CRUD.updateByID(Voter, role, req.body.id, req, res);
};

export default { find_ByID, updateByID };
