import router from './userRoutes';

import { receiveMessage } from '../controllers/chatController';

router.post('/receiveMessage', receiveMessage);

import { getMessageHistory } from '../controllers/chatController';

router.get('/messageHistory/:userId', getMessageHistory);

export default router;  // これが既定のエクスポートです