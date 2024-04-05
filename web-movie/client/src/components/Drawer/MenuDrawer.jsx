import React from "react";
import MainDrawer from "./MainDrawer";
import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { BsCollectionPlay, BsPhone } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";

const MenuDrawer = ({ drawerOpen, toggleDrawer }) => {
  const closeDrawer = () => {
    // Đảm bảo rằng toggleDrawer được gọi khi muốn đóng Drawer
    toggleDrawer();
  };
  const Links = [
    {
      name: "Movies",
      Link: "/movies",
      icon: BsCollectionPlay,
    },
    {
      name: "About Us",
      Link: "/about-us",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Contact Us",
      Link: "/contact-us",
      icon: BsPhone,
    },
  ];
  const LinkDatas = [
    {
      icon: FiFacebook,
      color: "#1877f2",
      Link: "@contact-facebook",
    },
    {
      icon: FiInstagram,
      color: "#E4405F",
      Link: "@instagram.com",
    },
    {
      icon: AiFillGithub,
      color: "black",
      Link: "https://github.com/thong2085",
    },
  ];
  const active =
    "rounded bg-white transitions text-main flex gap-3 items-center p-4";
  const hover = "hover:text-subMain hover:bg-main";
  const inActive =
    "rounded font-medium hover:text-subMain text-sm transitions flex gap-3 items-center sm:px-8 px-4 py-4 ";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${hover}` : `${inActive} ${hover}`;
  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-center bg-main text-white rounded">
        <div className="w-full flex-btn h-16 px-6 py-4 bg-dry items-center">
          <Link to="/" onClick={closeDrawer}>
            <img
              src="logo.png"
              alt="logo"
              className="w-14 h-14 object-contain "
            />
          </Link>
          <button
            onClick={closeDrawer}
            type="button"
            className="transitions w-10 h-10 flex-colo text-base font-medium text-white bg-subMain rounded-full hover:bg-main border hover:border-subMain"
          >
            <IoClose />
          </button>
        </div>
        {/* Menu links */}
        <div className="w-full overflow-y-scroll flex-grow max-height-full">
          <div className="pb-12 pt-4">
            {Links.map((link, i) => (
              <NavLink
                to={link.Link}
                key={i}
                onClick={closeDrawer}
                className={Hover}
              >
                <link.icon className="text-lg" />
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="flex-rows gap-6 w-full">
            {LinkDatas.map((link, i) => (
              <a
                href={link.Link}
                key={i}
                className="mb-4 w-12 transitions hover:bg-subMain flex-colo text-lg h-12 text-subMain bg-white rounded bg-opacity-30"
              >
                <link.icon
                  className="w-10 h-10"
                  style={{ color: link.color }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainDrawer>
  );
};

export default MenuDrawer;
