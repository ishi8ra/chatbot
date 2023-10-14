import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// 新たに追加するエンドポイント（例）
// router.put('/update/:userId', userController.updateUser);


export default router;