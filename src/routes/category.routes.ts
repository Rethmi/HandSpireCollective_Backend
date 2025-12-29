// import {Router} from "express";
// import {
//     getAllCategories,
//     saveCategories,
//     getCategory,
//     updateCategory,
//     deleteCategory
// } from "../controllers/category.controller"
// import {authenticateToken, authorizeRole} from "../middlewares/auth.middleware";

// const categoryRouter: Router = Router()

// categoryRouter.get("/", getAllCategories);
// categoryRouter.post("/", authenticateToken,authorizeRole('ADMIN'),saveCategories)
// categoryRouter.get("/:id",getCategory )
// categoryRouter.put("/:id",authenticateToken, authorizeRole('ADMIN'),updateCategory)
// categoryRouter.delete("/:id",authenticateToken, authorizeRole('ADMIN'),deleteCategory)


// export default categoryRouter;

import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';

const router = Router();

// This matches: GET /api/category
router.get('/', categoryController.getAllCategories);

// If your frontend specifically calls /api/category/all, add this:
router.get('/all', categoryController.getAllCategories);

router.post('/', categoryController.saveCategories);
router.get('/:id', categoryController.getCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;