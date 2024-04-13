import React, { useContext, useEffect } from "react";
import { CgMenuBoxed } from "react-icons/cg";
import { FiHeart, FiHome, FiUserCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import MenuDrawer from "../../components/Drawer/MenuDrawer";
import { SidebarContext } from "../../context/DrawerContext";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteMoviesAction } from "../../redux/Actions/userActions";

const MobileFooter = () => {
  const dispatch = useDispatch();
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

  const { mobileDrawer, toggleDrawer } = useContext(SidebarContext);
  const active =
    "rounded bg-white transitions text-main flex gap-3 items-center p-4";
  const hover = "hover:text-subMain hover:bg-main";
  const inActive =
    "rounded font-medium hover:text-subMain text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${hover}` : `${inActive} ${hover}`;
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
  }, [dispatch]);
  return (
    <>
      <div className="flex flex-col justify-between align-middle h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        {/* Drawer */}
        <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink className={Hover} to="/">
            <FiHome className="w-5 h-5" />
          </NavLink>
          <NavLink to="/favorites" className={Hover}>
            <div className="relative">
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-4 -right-4">
                {likedMovies?.length}
              </div>
              <FiHeart className="w-5 h-5" />
            </div>
          </NavLink>
          <NavLink className={Hover} to="/login">
            <FiUserCheck className="w-5 h-5" />
          </NavLink>
          <button onClick={toggleDrawer} className={inActive}>
            <CgMenuBoxed className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
