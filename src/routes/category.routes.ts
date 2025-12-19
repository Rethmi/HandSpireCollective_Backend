import {Router} from "express";
import {
    getAllCategories,
    saveCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller"
import {authenticateToken, authorizeRole} from "../middlewares/auth.middleware";

const categoryRouter: Router = Router()

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", authenticateToken,authorizeRole('ADMIN'),saveCategories)
categoryRouter.get("/:id",getCategory )
categoryRouter.put("/:id",authenticateToken, authorizeRole('ADMIN'),updateCategory)
categoryRouter.delete("/:id",authenticateToken, authorizeRole('ADMIN'),deleteCategory)


export default categoryRouter;