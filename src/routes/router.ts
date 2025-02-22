import { Router } from 'express';
import { getProducts } from '../routeHandlers/product';

const router = Router();

router.get('/', getProducts);

export default router;
