import express, {Router} from 'express';
import { addCommentController, createBlogController, deleteBlogController, deleteCommentController, editBlogController, getAllBlogsController, getAllBlogsForAdminController, getBlogByIdController, likeBlogController } from '../controllers/blog.controllers';
import { validateJwtToken } from '../middleware/jwtValidator';
import { validateUser } from '../v2/middleware/validateUser';

const router: Router = express.Router();

// Admin side
router.post('/',createBlogController)
router.put('/edit/:id',editBlogController)
router.delete('/:id',deleteBlogController)
router.put('/delete-comment',deleteCommentController)
router.get('/blogs-admin',getAllBlogsForAdminController)

// Customer side
router.put('/comment',validateUser, addCommentController)
router.get('/page/:page',getAllBlogsController)
router.get('/id/:id',getBlogByIdController)
router.put('/like',validateUser, likeBlogController)

export default router;

