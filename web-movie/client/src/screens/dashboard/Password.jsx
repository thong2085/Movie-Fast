import React from "react";
import SideBar from "./SideBar";
import { Input } from "../../components/UsedInput";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as UserValidation from "../../components/validation/UserValidation";
import { InlineError } from "../../components/notfications/Error";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { changePasswordAction } from "../../redux/Actions/userActions";

const Password = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userChangePassword
  );

  // validate user
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserValidation.PasswordValidation),
  });

  // change password
  const onSubmit = (data) => {
    dispatch(changePasswordAction(data));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isSuccess, isError, dispatch, message, reset]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white">Change Password</h2>
        <div className="w-full">
          <Input
            label="Previous Password"
            placeholder="*********"
            type="password"
            name="oldPassword"
            register={register("oldPassword")}
            bg={true}
          />
          {errors.oldPassword && (
            <InlineError text={errors.oldPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="New Password"
            placeholder="*********"
            type="password"
            name="newPassword"
            register={register("newPassword")}
            bg={true}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="Confirm Password"
            placeholder="*********"
            type="password"
            name="confirmPassword"
            register={register("confirmPassword")}
            bg={true}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
          )}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            disabled={isLoading}
            className="bg-subMain  text-medium font-medium transitions hover:bg-main border-2 border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default Password;
