import React, { useEffect, useState } from "react";
import { Input, Message, Select } from "../../../components/UsedInput";
import SideBar from "../SideBar";
import Uploder from "../../../components/Uploder";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { movieValidation } from "../../../components/validation/MovieValidation";
import {
  createMovieAction,
  removeCastAction,
} from "../../../redux/Actions/moviesAction";
import { InlineError } from "../../../components/notfications/Error";
import { ImagePreview } from "../../../components/ImagePreview";

const AddMovie = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithouTitle, setImageWithouTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );

  const { casts } = useSelector((state) => state.castsMovie);

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      createMovieAction({
        ...data,
        image: imageWithouTitle,
        titleImage: imageTitle,
        casts,
      })
    );
  };

  // delete cast handler
  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id));
    toast.success("Cast deleted successfully");
  };

  // useEffect
  useEffect(() => {
    // if modal is false then reset cast
    if (modalIsOpen === false) {
      setCast();
    }
    // if its success then reset form and navigate to addMovie
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        category: "",
        video: "",
        desc: "",
      });
      setImageTitle("");
      setImageWithouTitle("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/addmovie");
    }
    // if error then show error
    if (isError) {
      toast.error("Something went wrong");
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [modalIsOpen, isError, isSuccess, navigate, dispatch]);

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
          <div className="w-full">
            <Input
              label="Movie Title"
              placeholder="Game of Thrones"
              type="text"
              bg={true}
              name="name"
              register={register("name")}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Hours"
              placeholder="2 hours"
              name="time"
              register={register("time")}
              type="number"
              bg={true}
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Language Used"
              placeholder="English"
              type="text"
              bg={true}
              name="language"
              register={register("language")}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Year of Release"
              placeholder="2022"
              type="number"
              bg={true}
              name="year"
              register={register("year")}
            />
            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>
        {/* IMAGES  */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* img without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image without Title
            </p>
            <Uploder setImageUrl={setImageWithouTitle} />
            <ImagePreview image={imageWithouTitle} name="imageWithouTitle" />
          </div>
          {/* image with Title*/}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image with Title
            </p>
            <Uploder setImageUrl={setImageTitle} />
            <ImagePreview image={imageTitle} name="imageTitle" />
          </div>
        </div>
        {/* DESC*/}
        <div className="w-full">
          <Message
            name="desc"
            register={{ ...register("desc") }}
            label="Description"
            placeholder="Make it short and sweet"
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>
        {/* CATEGORY*/}
        <div className="text-sm w-full">
          <Select
            label="Movie Category"
            options={categories?.length > 0 ? categories : []}
            name="category"
            register={{ ...register("category") }}
          />
          {errors.category && <InlineError text={errors.category.message} />}
        </div>
        {/* MOVIE VIDEO */}
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full">
            <Input
              label="YouTube Video ID"
              placeholder="Enter YouTube Video ID"
              type="text"
              bg={true}
              name="video"
              register={{ ...register("video") }}
            />
            {errors.video && <InlineError text={errors.video.message} />}
          </div>
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
            {casts?.length > 0 &&
              casts?.map((user) => (
                <div
                  key={user.id}
                  className="p-2 italic text-xs text-text rounded flex-colo bg-main border-2 border-border"
                >
                  <img
                    src={user?.image ? user.image : "user.jpg"}
                    alt={user?.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p>{user?.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      onClick={() => deleteCastHandler(user?.id)}
                      className=" flex-colo bg-dry  text-subMain "
                    >
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
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain text-xl font-bold flex-rows gap-3 transitions hover:bg-main border-2 border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
        >
          {isLoading ? (
            "Please wait..."
          ) : (
            <>
              <ImUpload /> Publish Movie
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
};

export default AddMovie;
