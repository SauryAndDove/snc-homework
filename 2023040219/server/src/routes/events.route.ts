import { Router } from 'express';
import { getEvents } from '../controllers/events.controller';

const router = Router();
router.get('/api/events', getEvents);

export default router;