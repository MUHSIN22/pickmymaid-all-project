import express, { Router } from 'express';
import {
  generatePaymentTokenController,
  getPaymentsController,
  getUserPaymentDetailsController,
  manualPaymentController,
  verifyPaymentTokenController,
} from '../controllers/payment.controller';
import { validateJwtToken } from '../middleware/jwtValidator';
import { roleValidator } from '../middleware/roleValidator';
import { validateUser } from '../v2/middleware/validateUser';

const router: Router = express.Router();

router.post('/subscribe', generatePaymentTokenController);
router.post('/verify', verifyPaymentTokenController);
router.get('/', validateJwtToken, roleValidator(['SA']), getPaymentsController);
router.post('/manual-verify', manualPaymentController);
router.get('/payment-details', validateUser, getUserPaymentDetailsController);
export default router;
