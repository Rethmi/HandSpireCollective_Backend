// import {Request, Response} from "express";
// import * as categoryService from '../services/category.service';

// export const getAllCategories = async (req : Request, res: Response) =>{
//     try {
//         const categories =await categoryService.getAllCategories();
//         res.status(200).json(categories);
//     } catch (error){
//         res.status(500).json({
//             error : 'something went wrong!'
//         });
//     }
// }


// export const saveCategories = async (req : Request, res: Response) => {
//     try{
//         const newCategory = req.body;
//         const validationError = categoryService.validateCategory(newCategory);
//         if(validationError) {
//             res.status(400).json({
//                 error: validationError
//             });
//             return
//         }
//         const saveCategory =await categoryService.saveCategory(newCategory);
//         res.status(201).json(saveCategory)
//     } catch (error){
//         console.error(error);
//         res.status(500).json({
//             error : 'something went wrong!'
//         });
//     }

// }

// export const getCategory = async (req : Request, res: Response)=>{
//     const categoryId = (req.params.id);
//     // if(isNaN(categoryId)){
//     //     res.status(400).json({
//     //         error : 'Invalid Category Id'
//     //     });
//     //     return
//     // }
//     const category =await categoryService.getCategoryById(categoryId);
//     if(!category){
//         res.status(404).json({
//             error : 'Product not found'
//         });
//         return;
//     }
//     res.status(200).json(category)
// }

// export const updateCategory =async (req : Request, res: Response)=>{
//     const categoryId = (req.params.id);
//     // if(isNaN(categoryId)){
//     //     res.status(400).json({
//     //         error : 'Invalid Category Id'
//     //     });
//     //     return
//     // }
//     const updatedData = req.body;
//     const updatedCategory = await categoryService.updateCategory(categoryId, updatedData);
//     if(!updatedCategory){
//         res.status(404).json({
//             error : "Category not found"
//         });
//         return;
//     }
//     res.status(200).json(updatedCategory)
// }

// export const deleteCategory =async (req : Request, res: Response)=>{
//     const categoryId = (req.params.id);
//     // if(isNaN(categoryId)){
//     //     res.status(400).json({
//     //         error : 'Invalid Category Id'
//     //     });
//     //     return
//     // }
//     const deleteCategory =await categoryService.deleteCategory(categoryId);
//     if(!deleteCategory){
//         res.status(404).json({
//             error : 'Category not found'
//         });
//         return;
//     }
//     res.status(200).json({
//         message : 'Category deleted successfully!'
//     })
// }
import { Request, Response } from "express";
import * as categoryService from '../services/category.service';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        // Ensure we return an empty array if null, to prevent frontend mapping errors
        res.status(200).json(categories || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

export const saveCategories = async (req: Request, res: Response) => {
    try {
        const newCategory = req.body;
        const validationError = categoryService.validateCategory(newCategory);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }
        const savedCategory = await categoryService.saveCategory(newCategory);
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

export const getCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category' });
    }
}

// export const updateCategory = async (req: Request, res: Response) => {
//     try {
//         const categoryId = req.params.id;
//         const updatedCategory = await categoryService.updateCategory(categoryId, req.body);
//         if (!updatedCategory) {
//             return res.status(404).json({ error: "Category not found" });
//         }
//         res.status(200).json(updatedCategory);
//     } catch (error) {
//         res.status(500).json({ error: "Update failed" });
//     }
// }
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const updateData = req.body;

        const updatedCategory = await categoryService.updateCategory(
            categoryId,
            updateData
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                error: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory,
        });
    } catch (error) {
        console.error("Update Category Error:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const deleted = await categoryService.deleteCategory(categoryId);
        if (!deleted) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
}