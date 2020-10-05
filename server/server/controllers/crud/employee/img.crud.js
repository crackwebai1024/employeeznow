import EmployeeImg from "../../../models/employee/img.model";
import FILEOP from "../utils/file_ope";

const find_ByID = async (req, res) => {
  await FILEOP.find_ByID(req, res, EmployeeImg);
};

const updateByID = async (req, res) => {
  await FILEOP.updateByID(req, res, EmployeeImg);
};

export default { find_ByID, updateByID };
