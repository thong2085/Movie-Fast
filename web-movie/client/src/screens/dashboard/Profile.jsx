import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Uploder from "../../components/Uploder";
import { Input } from "../../components/UsedInput";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../components/notfications/Error";
import * as UserValidation from "../../components/validation/UserValidation";
import {
  deleteProfileAction,
  updateProfileAction,
} from "../../redux/Actions/userActions";
import toast from "react-hot-toast";
import { ImagePreview } from "../../components/ImagePreview";

const Profile = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userUpdateProfile);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    // isSuccess: deleteSuccess,
  } = useSelector((state) => state.userDeleteProfile);

  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserValidation.ProfileValidation),
  });

  // update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  // delete profile
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile?") &&
      dispatch(deleteProfileAction());
  };

  // useEffect
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);
  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl} />
          </div>
          {/* image preview */}
          <div className="col-span-2">
            <ImagePreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : "John Smith"}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            label="FullName"
            placeholder="Movies Fast"
            name="fullName"
            register={register("fullName")}
            type="text"
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            placeholder="moviesfast@gmail.com"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-dryGray text-subMain font-medium transitions hover:bg-subMain border border-subMain hover:text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button
            disabled={deleteLoading || isLoading}
            className="hover:border hover:bg-transparent border-subMain flex-colo rounded bg-subMain  font-medium transitions border  text-white py-3 px-6 w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default Profile;
