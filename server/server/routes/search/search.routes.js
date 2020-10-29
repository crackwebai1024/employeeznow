import express from "express";
import searchCtrl from "../../controllers/search/search";
import searchResCtrl from "../../controllers/crud/employer/searchres.crud";

const router = express.Router();
const { searchEmployee, phoneTest } = searchCtrl;
const { find_ByID } = searchResCtrl;
router.route("/aggtable").post(phoneTest);
router.route("/searchresult").get(find_ByID);

export default router;
