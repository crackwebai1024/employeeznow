import SearchFilter from "../../../models/employer/search.model";
import CRUD from "../utils/general";

const find_ByID = async (req, res) => {
  let role = "employer";
  let experienceByID = await CRUD.find_ByID(
    SearchFilter,
    role,
    req.query.id,
    res
  );
  return res.status(200).json({
    experience: experienceByID,
  });
};

const updateByID = async (req, res) => {
  let role = "employer";
  await CRUD.updateByID(SearchFilter, role, req.body.id, req, res);
};

export default { find_ByID, updateByID };
