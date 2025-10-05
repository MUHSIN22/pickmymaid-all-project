import express, { Router } from "express";
import { acknowledgePaymentController, createPaymentController, downloadInvoice, generateReciept } from "../../controllers/v2/payment.controllers";
import { validateJwtToken } from "../../middleware/jwtValidator";
import { validateUser } from "../../v2/middleware/validateUser";


const router: Router = express.Router();

router.post('/create-payment',validateUser,createPaymentController);
router.post('/acknowledge/:ref',validateUser, acknowledgePaymentController)
router.get('/generate-reciept',  generateReciept)
router.post('/download-invoice', downloadInvoice)

export default router;