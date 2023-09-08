import express from 'express';
import { AuthControlller } from './auth.controller';
const router = express.Router();
router.post('/auth/signup', AuthControlller.signup);
router.post('/auth/login', AuthControlller.login);

export const AuthRoutes = router;
