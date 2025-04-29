import { userController } from 'controller/user-controller';
import { Router } from 'express';

export const router = Router();

router.post('/login', userController.addUser);
router.post('/register', userController.addUser);
router.post('/logout', userController.addUser);
