import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInput";
import Uploder from "../Uploder";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addCastAction,
  updateCastAction,
} from "../../redux/Actions/moviesAction";
import toast from "react-hot-toast";
import { InlineError } from "../notfications/Error";
import { ImagePreview } from "../ImagePreview";

const CastsModal = ({ modalOpen, setModalOpen, cast }) => {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState("");
  const generatedId = Math.floor(Math.random() * 100000000);
  const image = castImage ? castImage : cast?.image;

  // validate cast
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Cast Name is required"),
      })
    ),
  });

  // on submit
  const onSubmit = (data) => {
    if (cast) {
      // if cast is not full then update cast
      dispatch(
        updateCastAction({
          ...data,
          image: image,
          id: cast.id,
        })
      );
      toast.success("Cast updated successfully");
    } else {
      // else create cast
      dispatch(
        addCastAction({
          ...data,
          image: image,
          id: generatedId,
        })
      );
      toast.success("Cast created successfully");
    }
    reset();
    setCastImage("");
    setModalOpen(false);
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
    }
  }, [cast, setValue]);
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:4/5 border-border md:w-3/5 lg:w-2/5 border w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              label="Cast Name"
              placeholder="John Doe"
              type="text"
              bg={true}
              name="name"
              register={{ ...register("name") }}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Cast Image</p>
            <Uploder setImageUrl={setCastImage} />
            <ImagePreview
              image={image ? image : "/images/movies/user.jpg"}
              name="castImage"
            />
          </div>
          <button
            type="submit"
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-3 hover:border text-lg hover:bg-dry border-subMain flex-colo py-4 rounded bg-subMain text-white"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CastsModal;
