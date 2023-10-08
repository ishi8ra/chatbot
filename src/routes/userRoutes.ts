import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);
// その他のエンドポイント

export default router;
