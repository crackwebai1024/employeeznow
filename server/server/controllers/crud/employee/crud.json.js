import Employee from "../../../models/employee/basic.model";
import EmployeeDocument from "../../../models/employee/document.model";
import EmployeeExperience from "../../../models/employee/experience.model";
import EmployeePortfolio from "../../../models/employee/portfolio.model";
import EmployeePreference from "../../../models/employee/preference.model";
import EmployeeSkill from "../../../models/employee/skills.model";
import CRUD from "../utils/general";

const jsonData = {
  read: {
    basic: {
      model: Employee,
      role: "_id",
    },
    skill: {
      model: EmployeeSkill,
      role: "employee",
    },
    document: {
      model: EmployeeDocument,
      role: "employee",
    },
    experience: {
      model: EmployeeExperience,
      role: "employee",
    },
    preference: {
      model: EmployeePreference,
      role: "employee",
    },
    portfolio: {
      model: EmployeePortfolio,
      role: "employee",
    },
    operator: CRUD.find_ByID,
  },
  update: {
    basic: {
      model: Employee,
      role: "_id",
    },
    skill: {
      model: EmployeeSkill,
      role: "employee",
    },
    document: {
      model: EmployeeDocument,
      role: "employee",
    },
    experience: {
      model: EmployeeExperience,
      role: "employee",
    },
    preference: {
      model: EmployeePreference,
      role: "employee",
    },
    portfolio: {
      model: EmployeePortfolio,
      role: "employee",
    },
    operator: CRUD.updateByID,
  },
  add: {
    skill: {
      model: EmployeeSkill,
      role: "employee",
    },
    document: {
      model: EmployeeDocument,
      role: "employee",
    },
    experience: {
      model: EmployeeExperience,
      role: "employee",
    },
    preference: {
      model: EmployeePreference,
      role: "employee",
    },
    portfolio: {
      model: EmployeePortfolio,
      role: "employee",
    },
    operator: CRUD.create,
  },
};

export default jsonData;
