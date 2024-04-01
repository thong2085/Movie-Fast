import Categories from "../models/CategoriesModel.js";
import asyncHandler from "express-async-handler";

// ************* PUBLIC CONTROLLERS ****************
// @desc get all categories
// @route GET /api/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  try {
    // find all categories in DB
    const categories = await Categories.find({});
    // send all categories to the client
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ************* ADMIN CONTROLLERS ****************
// @desc Create a new category
// @route POST /api/categories
// @access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  try {
    // get title from request body
    const { title } = req.body;
    // create a new category
    const category = new Categories({ title });
    // save the category in DB
    const createdCategory = await category.save();
    // send new category to the client
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Update a category
// @route PUT /api/categories/:id
// @access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from request params
    const category = await Categories.findById(req.params.id);

    if (category) {
      // update category title
      category.title = req.body.title || category.title;
      // save the updated category in DB
      const updatedCategory = await category.save();
      // send the updated category to the client
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from request params
    const category = await Categories.findById(req.params.id);

    if (category) {
      // delete the category from DB
      await Categories.findByIdAndDelete(req.params.id);
      // send the category to the client
      res.json({ message: "Category deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
export { getCategories, createCategory, updateCategory, deleteCategory };
