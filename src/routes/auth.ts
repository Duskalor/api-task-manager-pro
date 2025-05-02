import { addUser, login, logout } from 'controller/user-controller';
import { Router } from 'express';

export const router = Router();

router.post('/register', addUser);
router.post('/login', login);
router.post('/logout', logout);
