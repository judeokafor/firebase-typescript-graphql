import * as express from 'express';

import controller from '../controllers';
import middleware from '../middleware';

const router = express.Router();

const { postProperty, editProperty, deleteExistingProperty } = controller.property;
const { processFormData, authorization } = middleware;

router.post('/', authorization, processFormData, postProperty);
router.put('/:id', authorization, processFormData, editProperty);
router.delete('/:id', authorization, deleteExistingProperty);

export default router;
