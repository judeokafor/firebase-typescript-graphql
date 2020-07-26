import * as express from 'express';

import controller from '../controllers';
import middleware from '../middleware';

const router = express.Router();

const { createNewUser, editUser, addOrRemovePropertyFromFavorites } = controller.user;
const { processFormData, authorization } = middleware;

router.post('/', createNewUser);
router.put('/:id', authorization, processFormData, editUser);
router.patch('/:id', authorization, addOrRemovePropertyFromFavorites);

export default router;
