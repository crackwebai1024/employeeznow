import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import EmpCtrl from "../../controllers/crud/employee/main.crud";
import SkillCtrl from "../../controllers/crud/employee/skill.crud";
import PrefCtrl from "../../controllers/crud/employee/preference.crud";
import ExpCtrl from "../../controllers/crud/employee/experience.crud";
import DocCtrl from "../../controllers/crud/employee/document.crud";
import AWSCtrl from "../../controllers/crud/utils/aws_ope";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
router.route("/databyid").get(requireSignin, hasAuthorization, EmpCtrl.read);

// skill read, create, update(get for read, post for create and update)
router
  .route("/skill")
  .get(requireSignin, hasAuthorization, SkillCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, SkillCtrl.updateByID);

router
  .route("/preference")
  .get(requireSignin, hasAuthorization, PrefCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, PrefCtrl.updateByID);

router
  .route("/experience")
  .get(requireSignin, hasAuthorization, ExpCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, ExpCtrl.updateByID);

// document file read
router
  .route("/document")
  .get(requireSignin, hasAuthorization, DocCtrl.find_ByID);

// document file create
router
  .route("/create/document")
  .post(requireSignin, hasAuthorization, AWSCtrl.save, DocCtrl.updateByID);

// document file update
router
  .route("/update/document")
  .post(requireSignin, hasAuthorization, AWSCtrl.update, DocCtrl.updateByID);

export default router;
