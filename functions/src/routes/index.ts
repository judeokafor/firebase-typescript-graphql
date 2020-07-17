import user from './user';
import express from 'express';

const router = express.Router();

router.use('/user', user);

export default router;
