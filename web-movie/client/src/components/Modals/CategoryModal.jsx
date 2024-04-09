import React, { useState, useEffect } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../redux/Actions/categoriesAction";
import toast from "react-hot-toast";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.categoryCreate
  );

  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.categoryCreate);

  //  category handle
  const submitHandle = (e) => {
    e.preventDefault();
    if (title) {
      // if category is not empty then update else create category
      if (category) {
        dispatch(updateCategoryAction(category._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(createCategoryAction({ title: title }));
        setTitle("");
      }
    } else {
      toast.error("Please write a category name");
    }
  };

  useEffect(() => {
    if (upError || isError) {
      dispatch({
        type: isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET",
      });
      toast.error(upError || isError);
    }
    if (isSuccess || upSuccess) {
      dispatch({
        type: isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET",
      });
    }
    // if category is not null then set title to category title
    if (category) {
      setTitle(category?.title);
    }
    // if modal is closed then set title to empty
    if (modalOpen === false) {
      setTitle("");
    }
  }, [dispatch, upError, isError, isSuccess, upSuccess, category, modalOpen]);
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:4/5 border-border md:w-3/5 lg:w-2/5 border w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form
          className="flex flex-col gap-6 text-left mt-6"
          onSubmit={submitHandle}
        >
          <Input
            label="Category Name"
            placeholder={"Actions"}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            className="w-full flex-rows gap-3 hover:border text-lg hover:bg-dry border-subMain flex-colo py-4 rounded bg-subMain text-white"
          >
            {isLoading || upLoading
              ? "Loading...."
              : category
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CategoryModal;
