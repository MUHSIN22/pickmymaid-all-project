import { getApprovedJobApplicationFormController, getJobApplicationbyidFormController, getAllJobApplicationFormController, getVerifiedAndReferenceJobApplicationFormController, disableJobApplicationController, changeAvailabilityStatusController, getThecountsJobApplicationController, getFeaturedMaidsController, createNewJobController, getNewJobController, deleteNewjobController, searchNewJobController, assureJobApplicationController, getJobApplicationbyidDashboardFormController, toggleWishlistItemController, listAllWishlist, getAllMaidsForSEO } from './../controllers/jobApplication.controller';
import express, { Router } from 'express';
import {
  createJobApplicationClientController,
  createJobApplicationDashboardController,
  deleteJobApplicationController,
  getJobApplicationFormController,
  updateJobApplicationFormController,
  verifyJobApplicationController,
} from '../controllers/jobApplication.controller';
import { validateJwtToken } from '../middleware/jwtValidator';
import { jobApplicationClientFormSchema } from '../middleware/requestValidators/jobApplication.validator';
import { roleValidator } from '../middleware/roleValidator';
import { validator } from '../middleware/validator';


const router: Router = express.Router();
/// registered by users from frontend
router.post('/register', validator(jobApplicationClientFormSchema), createJobApplicationClientController);

router.get('/', validateJwtToken,getJobApplicationFormController);
router.post('/id', getJobApplicationbyidFormController);
router.post('/id-dashboard',validateJwtToken,roleValidator(['SA','A']), getJobApplicationbyidDashboardFormController);
router.put('/', validateJwtToken,roleValidator(['SA','A']),updateJobApplicationFormController);
router.post('/',validateJwtToken,roleValidator(['SA','A']),createJobApplicationDashboardController);
router.delete('/',validateJwtToken,roleValidator(['SA']), deleteJobApplicationController);
router.post('/verify',validateJwtToken,roleValidator(['SA']), verifyJobApplicationController);
router.get('/approved',validateJwtToken,roleValidator(['SA']),getApprovedJobApplicationFormController)
router.get('/all',getAllJobApplicationFormController)
router.get('/client-approved',getVerifiedAndReferenceJobApplicationFormController)
router.post('/disabled', validateJwtToken,roleValidator(['SA','A']),disableJobApplicationController);
router.post('/hire',validateJwtToken, roleValidator(['SA','A']),changeAvailabilityStatusController);
router.get('/featured',getFeaturedMaidsController)
router.post('/assured',validateJwtToken,roleValidator(['SA','A']),assureJobApplicationController)
router.get('/all-maids-seo', getAllMaidsForSEO)
//Count api 
router.get('/counts',getThecountsJobApplicationController)

// Wishtlist APIs
router.post('/toggle-wishlist',toggleWishlistItemController)
router.get('/wishlist', listAllWishlist)

//job api
router.post('/findjob',validateJwtToken,roleValidator(['SA','A']),createNewJobController)
router.get('/findjob',validateJwtToken,roleValidator(['SA','A']),getNewJobController)      //FOR ADMIN ONLY
router.get('/find',getNewJobController)    //FOR CLIENT ONLY
router.delete('/findjob',validateJwtToken,roleValidator(['SA']),deleteNewjobController)

router.post('/find-search',searchNewJobController)
export default router;
