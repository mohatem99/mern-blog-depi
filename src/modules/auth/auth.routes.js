import { Router } from "express";

import { register, logIn, allUsers } from "./auth.controller.js";

const router = Router();
router.get("/", allUsers);

router.post("/sign-up", register);
router.post("/sign-in", logIn);
export default router;
