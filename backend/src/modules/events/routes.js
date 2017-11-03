import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import {
  eventController,
  eventDetailController,
} from './eventController.js';

const router = expressAsyncAwait(Router());
router.get('/', eventController);
router.get('/:id', eventDetailController);

export default router;
