// // import {Request, Response} from "express";
// // import * as projectService from '../services/project.service';
// // import { EmailService } from '../services/email.service';
// // import jwt from 'jsonwebtoken';

// // interface JwtPayload {
// //     userId: string;
// //     username: string;
// //     email: string;
// //     role: string;
// // }

// // const getUserFromToken = (req: Request): JwtPayload | null => {
// //     try {
// //         const token = req.headers.authorization?.replace('Bearer ', '');
// //         if (!token) return null;

// //         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
// //         return decoded;
// //     } catch (error) {
// //         return null;
// //     }
// // };

// // export const getAllProjects = async (req: Request, res: Response) => {
// //     try {
// //         const projects = await projectService.getAllProjects();
// //         res.status(200).json(projects);
// //     } catch (error) {
// //         res.status(500).json({
// //             error: 'Something went wrong!'
// //         });
// //     }
// // }
// import { Request, Response } from "express";
// import * as projectService from '../services/project.service';
// import { EmailService } from '../services/email.service';
// import jwt from 'jsonwebtoken';

// interface JwtPayload {
//     userId: string;
//     username: string;
//     email: string;
//     role: string;
// }

// const getUserFromToken = (req: Request): JwtPayload | null => {
//     try {
//         const token = req.headers.authorization?.replace('Bearer ', '');
//         if (!token) return null;
//         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
//         return decoded;
//     } catch (error) {
//         return null;
//     }
// };

// export const getAllProjects = async (req: Request, res: Response) => {
//     try {
//         const projects = await projectService.getAllProjects();
//         // Ensure projects is always an array for the frontend .length check
//         res.status(200).json(projects || []);
//     } catch (error) {
//         res.status(500).json({ error: 'Something went wrong!' });
//     }
// }

// // export const updateProjects = async (req: Request, res: Response) => {
// //     try {
// //         const projectId = req.params.id;
// //         const updatedProject = await projectService.updateProjects(projectId, req.body);

// //         if (!updatedProject) {
// //             return res.status(404).json({ error: 'Project not found' });
// //         }

// //         const userInfo = getUserFromToken(req);
// //         const userName = userInfo?.username || updatedProject.author;

// //         if (updatedProject.uploadedUserEmail) {
// //             EmailService.sendProjectUpdateEmail(
// //                 updatedProject.uploadedUserEmail,
// //                 updatedProject,
// //                 userName
// //             );
// //         }

// //         return res.status(200).json({
// //             success: true,
// //             message: 'Project updated successfully!',
// //             project: updatedProject
// //         });
// //     } catch (error) {
// //         return res.status(500).json({ error: 'Something went wrong!' });
// //     }
// // }

// // ... keep other functions (saveProjects, deleteProjects, etc.) as they were


// export const saveProjects = async (req: Request, res: Response) => {
//     try {
//         const newProject = req.body;

//         const validationError = projectService.validateProjects(newProject);
//         if (validationError) {
//             res.status(400).json({
//                 error: validationError
//             });
//             return;
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(newProject.uploadedUserEmail)) {
//             res.status(400).json({
//                 error: 'Invalid email format'
//             });
//             return;
//         }

//         const savedProject = await projectService.saveProjects(newProject);

//         const userInfo = getUserFromToken(req);
//         const userName = userInfo?.username || newProject.author;

//         EmailService.sendProjectUploadSuccessEmail(
//             newProject.uploadedUserEmail,
//             savedProject,
//             userName
//         )

//         res.status(201).json({
//             success: true,
//             message: 'Project uploaded successfully! Confirmation email sent.',
//             project: savedProject
//         });

//     } catch (error) {


//         if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
//             res.status(409).json({
//                 error: 'Project with this ID already exists'
//             });
//             return;
//         }

//         res.status(500).json({
//             error: 'Something went wrong!'
//         });
//     }
// }

// export const getProjectByCategory = async (req: Request, res: Response) => {
//     try {
//         const category = req.params.category;

//         if (!category || category.trim() === '') {
//             return res.status(400).json({
//                 error: 'Category name is required'
//             });
//         }

//         const projectDto = await projectService.getProjectByCategory(category);

//         if (!projectDto || projectDto.length === 0) {
//             return res.status(404).json({
//                 error: 'Projects are not found for this category!',
//                 category: category
//             });
//         }

//         return res.status(200).json(projectDto);

//     } catch (error) {
//         return res.status(500).json({
//             error: 'Internal server error',
//         });
//     }
// };

// export const getProjectById = async (req: Request, res: Response) => {
//     const projectId = req.params.id;

//     const project = await projectService.getProjectById(projectId);
//     if (!project) {
//         res.status(404).json({
//             error: 'Project not found'
//         });
//         return;
//     }
//     res.status(200).json(project);
// }

// export const getProjectsByEmail = async (req: Request, res: Response) => {
//     try {
//         const userEmail = req.params.uploadedUserEmail;

//         const projects = await projectService.getProjectsByUserEmail(userEmail);

//         if (!projects || projects.length === 0) {
//             res.status(200).json({
//                 success: true,
//                 message: 'No projects found for this user',
//                 projects: [],
//                 count: 0
//             });
//             return;
//         }

//         res.status(200).json({
//             success: true,
//             projects: projects,
//             count: projects.length
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch projects'
//         });
//     }
// };

// export const updateProjects = async (req: Request, res: Response) => {
//     try {
//         const projectId = req.params.id;

//         const updatedProject = await projectService.updateProjects(projectId, req.body);

//         if (!updatedProject) {
//             res.status(404).json({
//                 error: 'Project not found'
//             });
//             return;
//         }

//         const userInfo = getUserFromToken(req);
//         const userName = userInfo?.username || updatedProject.author;

//         if (updatedProject.uploadedUserEmail) {
//             EmailService.sendProjectUpdateEmail(
//                 updatedProject.uploadedUserEmail,
//                 updatedProject,
//                 userName
//             )

//         res.status(200).json({
//             success: true,
//             message: 'Project updated successfully! Notification email sent.',
//             project: updatedProject
//         });

//     } } catch (error) {
//         res.status(500).json({
//             error: 'Something went wrong!'
//         });
//     }
// }

// export const deleteProjects = async (req: Request, res: Response) => {
//     const projectId = req.params.id;

//     const deletedProject = await projectService.deleteProjects(projectId);
//     if (!deletedProject) {
//         res.status(404).json({
//             error: 'Project not found'
//         });
//         return;
//     }
//     res.status(200).json({
//         message: 'Project deleted successfully!'
//     })
// }

// export const testEmail = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { email } = req.body;

//         if (!email) {
//             res.status(400).json({
//                 success: false,
//                 message: 'Email is required'
//             });
//             return;
//         }

//         const emailSent = await EmailService.sendTestEmail(email);

//         if (emailSent) {
//             res.status(200).json({
//                 success: true,
//                 message: 'Test email sent successfully'
//             });
//         } else {
//             res.status(500).json({
//                 success: false,
//                 message: 'Failed to send test email'
//             });
//         }

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to send test email',
//             error: error instanceof Error ? error.message : 'Unknown error'
//         });
//     }
// };
import { Request, Response } from "express";
import * as projectService from "../services/project.service";
import { EmailService } from "../services/email.service";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

const getUserFromToken = (req: Request): JwtPayload | null => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};

export const getAllProjects = async (_: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects || []);
  } catch {
    res.status(500).json({ error: "Something went wrong!" });
  }
};
export const getProjectsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const projects = await projectService.getProjectByCategory(category);
    res.status(200).json(projects || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects by category" });
  }
};

// export const saveProjects = async (req: Request, res: Response) => {
//   try {
//     const newProject = req.body;

//     const error = projectService.validateProjects(newProject);
//     if (error) return res.status(400).json({ error });

//     const saved = await projectService.saveProjects(newProject);

//     const user = getUserFromToken(req);
//     EmailService.sendProjectUploadSuccessEmail(
//       newProject.uploadedUserEmail,
//       saved,
//       user?.username || newProject.author
//     );

//     res.status(201).json({ success: true, project: saved });
//   } catch (e: any) {
//     if (e.code === 11000)
//       return res.status(409).json({ error: "Duplicate project ID" });
//     res.status(500).json({ error: "Something went wrong!" });
//   }
// };

export const saveProjects = async (req: Request, res: Response) => {
  try {
    const newProject = req.body;

    const error = projectService.validateProjects(newProject);
    if (error) return res.status(400).json({ error });

    const saved = await projectService.saveProjects(newProject);
    const user = getUserFromToken(req);

    // 1. User ට confirmation email එක යැවීම
    EmailService.sendProjectUploadSuccessEmail(
      newProject.uploadedUserEmail,
      saved,
      user?.username || newProject.author
    );

    // 2. Admin ට notification email එක යැවීම (අලුතින් එකතු කළ කොටස)
// Controller එක ඇතුළත
await EmailService.sendAdminNewProjectNotification(saved);

    res.status(201).json({ success: true, project: saved });
  } catch (e: any) {
    if (e.code === 11000)
      return res.status(409).json({ error: "Duplicate project ID" });
    res.status(500).json({ error: "Something went wrong!" });
  }
};
export const getProjectsByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.uploadedUserEmail;
    const projects = await projectService.getProjectsByUserEmail(email);

    res.status(200).json({
      success: true,
      projects: projects || [],
      count: projects?.length || 0
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const updateProjects = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const updated = await projectService.updateProjects(projectId, req.body);

    if (!updated)
      return res.status(404).json({ error: "Project not found" });

    const user = getUserFromToken(req);
    if (updated.uploadedUserEmail) {
      EmailService.sendProjectUpdateEmail(
        updated.uploadedUserEmail,
        updated,
        user?.username || updated.author
      );
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updated
    });
  } catch {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const deleteProjects = async (req: Request, res: Response) => {
  const deleted = await projectService.deleteProjects(req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Project not found" });
  res.status(200).json({ success: true });
};

export const getProjectById = async (req: Request, res: Response) => {
  const project = await projectService.getProjectById(req.params.id);
  if (!project) return res.status(404).json({ error: "Not found" });
  res.status(200).json(project);
};
