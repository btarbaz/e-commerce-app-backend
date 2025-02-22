import { Router } from 'express';
import auth from './auth';
import cart from './cart';
import product from './product';

const router = Router();

router.use('/auth', auth);
router.use('/product', product);
router.use('/cart', cart);

export default router;
