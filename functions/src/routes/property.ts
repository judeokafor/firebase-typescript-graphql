import * as express from 'express';

import controller from '../controllers';
import middleware from '../middleware';

const router = express.Router();

const {
	postProperty,
	editProperty,
	deleteExistingProperty,
	handlePropertyImageUpload,
} = controller.property;
const { processFormData, authorization } = middleware;

router.post('/', authorization, postProperty);
router.put('/:id', authorization, editProperty);
router.put('/image/:id', authorization, processFormData, handlePropertyImageUpload);
router.delete('/:id', authorization, deleteExistingProperty);

export default router;
