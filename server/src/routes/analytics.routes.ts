import express, {Router} from 'express'
import { getCategoryAnalyticsDataController, saveCategoryForAnalyticsController } from '../controllers/analytics.controllers';
import { validateJwtToken } from '../middleware/jwtValidator';
import { roleValidator } from '../middleware/roleValidator';

const router: Router = express.Router();

router.post('/category-usage', saveCategoryForAnalyticsController)
router.get('/category-analytics',validateJwtToken, roleValidator(['SA']), getCategoryAnalyticsDataController)

export default router;