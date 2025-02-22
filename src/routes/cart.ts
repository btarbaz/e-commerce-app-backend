import { Router } from 'express';
import auth from '../middleware/auth';
import { addToCart, getCart } from '../routeHandlers/cart';

const router = Router();

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);

export default router;
