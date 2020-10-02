import Employee from "../../../models/employee/basic.model";
import EmployeeDocument from "../../../models/employee/document.model";
import EmployeeExperience from "../../../models/employee/experience.model";
import EmployeePortfolio from "../../../models/employee/portfolio.model";
import EmployeePreference from "../../../models/employee/preference.model";
import EmployeeSkill from "../../../models/employee/skills.model";
import CRUD from "../utils/general";
import jsonData from "./crud.json";

const { find_ByID } = CRUD;

const read = async (req, res) => {
  let id = req.query.id;
  let basicData = find_ByID(Employee, "_id", id, res);
  let documentData = find_ByID(EmployeeDocument, "employee", id, res);
  let experienceData = find_ByID(EmployeeExperience, "employee", id, res);
  let portfolioData = find_ByID(EmployeePortfolio, "employee", id, res);
  let preferenceData = find_ByID(EmployeePreference, "employee", id, res);
  let skillData = find_ByID(EmployeeSkill, "employee", id, res);
  Promise.all([
    basicData,
    documentData,
    experienceData,
    portfolioData,
    preferenceData,
    skillData,
  ])
    .then((values) => {
      console.log(values);
      return res.status(200).json({
        basic: values[0],
        document: values[1],
        experience: values[2],
        portfolio: values[3],
        preference: values[4],
        skill: values[5],
      });
    })
    .catch((err) => {
      return res.status(403).json({
        error: err,
      });
    });
};

const crudController = async (req, res) => {
  let url_split = req.url.split("/");
  let methodName = url_split[1];
  let dbName = url_split[2];
  let model = jsonData[methodName][dbName].model;
  let role = jsonData[methodName][dbName].role;
  let Operator = jsonData[methodName].operator;

  if (methodName === "add") {
    req.body[role] = req.body.id;
    await Operator(model, req, res);
  }

  if (methodName === "update") {
    await Operator(model, role, req.body.id, req, res);
  }
};

export default { read, crudController };
