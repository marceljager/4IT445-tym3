import { Router } from 'express';

import contactRoutes from './modules/contacts/routes';
import productRoutes from './modules/products/routes';
import eventRoutes from './modules/events/routes';

const router = Router();

router.use('/contacts', contactRoutes);
router.use('/products', productRoutes);
router.use('/events', eventRoutes);

export default router;
