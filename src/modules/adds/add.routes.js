import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import {
  addAdd,
  deleteAdd,
  getAdd,
  getAdds,
  updateAdd,
} from "./add.controller.js";

const router = Router();
router.route("/").post(auth, addAdd).get(getAdds);
router.route("/:id").put(auth, updateAdd).delete(auth, deleteAdd).get(getAdd);

export default router;
