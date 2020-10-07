import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import EmpCtrl from "../../controllers/crud/employee/main.crud";
import SkillCtrl from "../../controllers/crud/employee/skill.crud";
import PrefCtrl from "../../controllers/crud/employee/preference.crud";
import ExpCtrl from "../../controllers/crud/employee/experience.crud";
import DocCtrl from "../../controllers/crud/employee/document.crud";
import ImgCtrl from "../../controllers/crud/employee/img.crud";
import PortCtrl from "../../controllers/crud/employee/portfolio.crud";
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
  .get(requireSignin, hasAuthorization, DocCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, AWSCtrl.save, DocCtrl.updateByID)
  .delete(requireSignin, hasAuthorization, AWSCtrl.del, DocCtrl.updateByID);

router
  .route(["/photo", "/background"])
  .get(requireSignin, hasAuthorization, ImgCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, AWSCtrl.save, ImgCtrl.updateByID)
  .delete(requireSignin, hasAuthorization, AWSCtrl.del, ImgCtrl.updateByID);

router
  .route("/portfolio")
  .get(requireSignin, hasAuthorization, PortCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, AWSCtrl.save, PortCtrl.updateByID)
  .delete(requireSignin, hasAuthorization, AWSCtrl.del, PortCtrl.updateByID);

export default router;
