import * as express from 'express';

import controller from '../controllers';
import middleware from '../middleware';

const router = express.Router();

const { createNewUser } = controller.user;
const { processFormData } = middleware;

router.post('/', createNewUser);
router.put('/:id', processFormData, createNewUser);

export default router;
