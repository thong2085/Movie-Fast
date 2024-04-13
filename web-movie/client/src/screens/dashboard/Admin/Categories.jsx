import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../components/Table2";
import CategoryModal from "../../../components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getAllCategoriesAction,
} from "../../../redux/Actions/categoriesAction";
import toast from "react-hot-toast";
import Loader from "../../../components/notfications/Loader";
import { Empty } from "../../../components/notfications/Empty";

const Categories = () => {
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  // all categories
  const { categories, isLoading } = useSelector(
    (state) => state.categoryGetAll
  );

  // delete category
  const { isError, isSuccess } = useSelector((state) => state.categoryDelete);
  const adminDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  const OnEditFunction = (id) => {
    setCategory(id);
    setIsModalOpen(!modalIsOpen);
  };
  useEffect(() => {
    dispatch(getAllCategoriesAction());
    if (isSuccess) {
      dispatch({ type: "DELETE_CATEGORIES_RESET" });
    }

    if (isError) {
      toast.error(isError);
      dispatch({
        type: "DELETE_CATEGORIES_FAIL",
      });
    }
    if (modalIsOpen === false) {
      setCategory();
    }
  }, [modalIsOpen, isSuccess, isError, dispatch]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-subMain flex-btn gap-3 text-medium font-medium transitions hover:bg-main border-2 border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            <HiPlusCircle /> Create
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={adminDeleteCategory}
          />
        ) : (
          <Empty message="" />
        )}

        <CategoryModal
          modalOpen={modalIsOpen}
          setModalOpen={setIsModalOpen}
          category={category}
        />
      </div>
    </SideBar>
  );
};

export default Categories;
