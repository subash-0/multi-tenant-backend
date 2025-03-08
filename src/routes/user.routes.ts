import { Router } from "express";
const router = Router();

import { createUser, loginUser } from "../handlers/user";  // Correct path to your handler file

router.post('/login', loginUser);
router.post('/register', createUser);

export default router;
