import React from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInput";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:4/5 border-border md:w-3/5 lg:w-2/5 border w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Category Name"
            placeholder={category ? category.title : "Actions"}
            type="text"
            bg={true}
          />
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-3 hover:border text-lg hover:bg-dry border-subMain flex-colo py-4 rounded bg-subMain text-white"
          >
            {category ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CategoryModal;
