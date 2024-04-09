import * as CategoriesConstants from "../Constants/categoriesConstants";
import * as CategoriesAPIs from "../APIs/CategoriesServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// Get all categories action
export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: CategoriesConstants.GET_CATEGORIES_REQUEST });
    const data = await CategoriesAPIs.getCategoriesService();
    dispatch({
      type: CategoriesConstants.GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstants.GET_CATEGORIES_FAIL);
  }
};

// create categories action
export const createCategoryAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoriesConstants.CREATE_CATEGORIES_REQUEST });
    await CategoriesAPIs.createCategoryService(
      title,
      tokenProtection(getState)
    );
    dispatch({
      type: CategoriesConstants.CREATE_CATEGORIES_SUCCESS,
    });
    toast.success("Category created successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstants.CREATE_CATEGORIES_FAIL);
  }
};

// update categories action
export const updateCategoryAction =
  (id, title) => async (dispatch, getState) => {
    try {
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORIES_REQUEST });
      await CategoriesAPIs.updateCategoryService(
        id,
        title,
        tokenProtection(getState)
      );
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORIES_SUCCESS });
      toast.success("Category updated successfully");
      dispatch(getAllCategoriesAction());
    } catch (error) {
      ErrorsAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORIES_FAIL);
    }
  };

// delete categories action
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoriesConstants.DELETE_CATEGORIES_REQUEST });
    await CategoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
    dispatch({ type: CategoriesConstants.DELETE_CATEGORIES_SUCCESS });
    toast.success("Category deleted successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstants.DELETE_CATEGORIES_FAIL);
  }
};
