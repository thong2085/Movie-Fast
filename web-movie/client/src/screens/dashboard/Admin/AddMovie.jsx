import React, { useEffect, useState } from "react";
import { Input, Message, Select } from "../../../components/UsedInput";
import SideBar from "../SideBar";
import Uploder from "../../../components/Uploder";
import { CategoriesData } from "../../../data/CategoriesData";
import { UsersData } from "../../../data/MovieData";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../components/Modals/CastsModal";

const AddMovie = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    if (modalIsOpen === false) {
      setCast();
    }
  }, [modalIsOpen]);
  return (
    <SideBar>
      <CastsModal
        modalOpen={modalIsOpen}
        setModalOpen={setModalIsOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white">Create Movie</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <Input
            label="Movie Title"
            placeholder="Game of Thrones"
            type="text"
            bg={true}
          />
          <Input label="Hours" placeholder="2 hours" type="text" bg={true} />
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <Input
            label="Language Used"
            placeholder="English"
            type="text"
            bg={true}
          />
          <Input
            label="Year of Release"
            placeholder="2022"
            type="number"
            bg={true}
          />
        </div>
        {/* IMAGES  */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* img without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image without Title
            </p>
            <Uploder />
            <div className="w-32 h-32 p-2 bg-main border-2 border-border rounded">
              <img
                src="/images/movies/1a.jpg"
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
          {/* image with Title*/}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image with Title
            </p>
            <Uploder />
            <div className="w-32 h-32 p-2 bg-main border-2 border-border rounded">
              <img
                src="/images/movies/1.jpg"
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </div>
        {/* DESC*/}
        <Message label="Description" placeholder="Make it short and sweet" />
        {/* CATEGORY*/}
        <div className="text-sm w-full">
          <Select label="Movie Category" options={CategoriesData} />
        </div>
        {/* MOVIE VIDEO */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">
            Movie Video
          </label>
          <Uploder />
        </div>
        {/* CASTS */}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalIsOpen(true)}
            className="w-full py-4 bg-main border-2 border-subMain border-dashed text-white rounded"
          >
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grod-cols-4 grid-cols-2 gap-4">
            {UsersData.map((user, i) => (
              <div
                key={i}
                className="p-2 italic text-xs text-text rounded flex-colo bg-main border-2 border-border"
              >
                <img
                  src={`/images/movies/${
                    user?.image ? user.image : "user.jpg"
                  }`}
                  alt={user.fullName}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p>{user.fullName}</p>
                <div className="flex-rows mt-2 w-full gap-2">
                  <button className=" flex-colo bg-dry  text-subMain ">
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => {
                      setCast(user);
                      setModalIsOpen(true);
                    }}
                    className=" flex-colo bg-dry text-green-600"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* SUBMIT */}
        <button className="bg-subMain  text-xl font-bold flex-rows gap-3 transitions hover:bg-main border-2 border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
          <ImUpload /> Publish Movie
        </button>
      </div>
    </SideBar>
  );
};

export default AddMovie;
