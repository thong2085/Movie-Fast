import React from "react";
import { BsCollectionPlay } from "react-icons/bs";
import { CgMenuBoxed } from "react-icons/cg";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const MobileFooter = () => {
  const active =
    "rounded bg-white transitions text-subMain flex gap-3 items-center p-4";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${hover}` : `${inActive} ${hover}`;
  return (
    <>
      <div className="flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        {/* Drawer */}
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink className={Hover} to="/movies">
            <BsCollectionPlay className="w-5 h-5" />
          </NavLink>
          <NavLink to="/favorites" className={Hover}>
            <div className="relative">
              <div className="w-5 h-5 flex-colo rounde-full text-xs bg-subMain text-white absolute -top-5 -right-5">
                3
              </div>
              <FiHeart className="w-5 h-5" />
            </div>
          </NavLink>
          <NavLink className={Hover} to="/login">
            <FiUserCheck className="w-5 h-5" />
          </NavLink>
          <button className={inActive}>
            <CgMenuBoxed className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
