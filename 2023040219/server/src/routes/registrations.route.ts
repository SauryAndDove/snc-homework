import { Router } from 'express';
import { postRegistration } from '../controllers/registrations.controller';

const router = Router();
router.post('/api/events/:id/registrations', postRegistration);
export default router;
