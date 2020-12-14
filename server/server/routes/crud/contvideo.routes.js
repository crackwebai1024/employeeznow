import authCommonCtrl from "../../controllers/auth";
import videoCtrl from "../../controllers/crud/contest/video.crud";

const { requireSignin, hasAuthorization } = authCommonCtrl;
const { updateByID, find_ByID, deleteByID } = videoCtrl;

// create, read, update, delete video
router
  .route("/contestvideo/:id")
  .get(requireSignin, hasAuthorization, find_ByID);
router.route("/contestvideo").post(requireSignin, hasAuthorization, updateByID);
router
  .route("/contestvideo")
  .delete(requireSignin, hasAuthorization, deleteByID);
