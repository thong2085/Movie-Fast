import React from "react";
import SideBar from "./SideBar";
import Uploder from "../../components/Uploder";
import { Input } from "../../components/UsedInput";

const Profile = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white">Profile</h2>
        <Uploder />
        <Input
          label="FullName"
          placeholder="Movies Fast"
          type="text"
          bg={true}
        />
        <Input
          label="Email"
          placeholder="moviesfast@gmail.com"
          type="email"
          bg={true}
        />
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button className="bg-dryGray text-subMain font-medium transitions hover:bg-subMain border border-subMain hover:text-white py-3 px-6 rounded w-full sm:w-auto">
            Delete Account
          </button>
          <button className="hover:border hover:bg-transparent border-subMain flex-colo rounded bg-subMain  font-medium transitions border  text-white py-3 px-6 w-full sm:w-auto">
            Update Profile
          </button>
        </div>
      </div>
    </SideBar>
  );
};

export default Profile;
