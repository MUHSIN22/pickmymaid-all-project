import { getCustomersController, getMaidHistory, teamMemberRoleChangeController, toggleUserBlockController, updateCustomerPasswordController, verifyCustomerPaymentController } from './../controllers/admin.controllers';
import express, { Router } from 'express';
import { deleteTeamMemberController, getTeamMembersController } from '../controllers/admin.controllers';
import { validateJwtToken } from '../middleware/jwtValidator';
import { roleValidator } from '../middleware/roleValidator';

const router: Router = express.Router();

router.get('/team', validateJwtToken, roleValidator(['SA']), getTeamMembersController)
router.delete('/team-member/:id', validateJwtToken, roleValidator(['SA']), deleteTeamMemberController);
router.patch('/team-member/:id', validateJwtToken, roleValidator(['SA']), teamMemberRoleChangeController)
router.get('/history/:maid_id', validateJwtToken, roleValidator(['SA']), getMaidHistory)

router.put('/customer-password', validateJwtToken, roleValidator(['SA']), updateCustomerPasswordController)
router.get('/customer', validateJwtToken, roleValidator(['SA']), getCustomersController)

router.post('/verify-payment', validateJwtToken, roleValidator(['SA']), verifyCustomerPaymentController)
router.get('/block-user/:user_id', validateJwtToken, roleValidator(['SA']), toggleUserBlockController)

export default router;