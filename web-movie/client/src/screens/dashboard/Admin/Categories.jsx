import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { CategoriesData } from "../../../data/CategoriesData";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../components/Table2";
import CategoryModal from "../../../components/Modals/CategoryModal";

const Categories = () => {
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState();

  const OnEditFunction = (id) => {
    setCategory(id);
    setIsModalOpen(!modalIsOpen);
  };
  useEffect(() => {
    if (modalIsOpen === false) {
      setCategory();
    }
  }, [modalIsOpen]);
  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalIsOpen}
        setModalOpen={setIsModalOpen}
        category={category}
      />
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
        <Table2
          data={CategoriesData}
          users={false}
          OnEditFunction={OnEditFunction}
        />
      </div>
    </SideBar>
  );
};

export default Categories;
