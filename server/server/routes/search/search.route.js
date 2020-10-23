import express from "express";
import searchCtrl from "../../controllers/search/search";

const router = express.Router();
const { aggtable } = searchCtrl;

router.route("/aggtable").post(aggtable);

export default router;
