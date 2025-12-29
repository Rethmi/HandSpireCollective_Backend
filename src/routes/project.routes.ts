// import { Router } from "express";
// import {
//     getAllProjects,
//     saveProjects,
//     getProjectByCategory,
//     updateProjects,
//     deleteProjects,
//     getProjectById,
//     getProjectsByEmail,
//     testEmail
// } from "../controllers/project.controller";
// import { authenticateToken, authorizeRole } from "../middlewares/auth.middleware";

// const projectRouter: Router = Router();

// projectRouter.get("/all", getAllProjects);
// projectRouter.post("/save", saveProjects);
// projectRouter.get("/category/:category", getProjectByCategory);
// // projectRouter.put("/update/:id", authenticateToken, authorizeRole('USER'), updateProjects);
// projectRouter.put(
//   "/update/:id",
//   authenticateToken,
//   // authorizeRole('USER'),
//   updateProjects
// );

// projectRouter.delete("/delete/:id", deleteProjects);
// projectRouter.get("/user/:uploadedUserEmail", getProjectsByEmail);
// projectRouter.get("/:id", getProjectById);

// projectRouter.post("/test-email", testEmail);

// export default projectRouter;
import { Router } from "express";
import {
  getAllProjects,
  saveProjects,
  updateProjects,
  deleteProjects,
  getProjectById,
  getProjectsByEmail
} from "../controllers/project.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { getProjectsByCategory } from "../controllers/project.controller";

const router = Router();

router.get("/all", getAllProjects);
router.post("/save", authenticateToken, saveProjects);
router.get("/user/:uploadedUserEmail", authenticateToken, getProjectsByEmail);
router.put("/update/:id", authenticateToken, updateProjects);
router.delete("/delete/:id", authenticateToken, deleteProjects);
router.get("/category/:category", getProjectsByCategory); // Add this
router.get("/:id", getProjectById);

export default router;
