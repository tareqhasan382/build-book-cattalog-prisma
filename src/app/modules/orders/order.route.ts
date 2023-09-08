import express from 'express';
import { OrderControlller } from './order.controller';

const router = express.Router();
router.post('/orders', OrderControlller.createOrder);
router.get('/orders', OrderControlller.getOrders);
router.get('/orders/:orderId', OrderControlller.getOrder);

export const OrderRoutes = router;
//orders/create-order
