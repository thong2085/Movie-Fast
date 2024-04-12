import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AboutUs from "./screens/AboutUs";
import NotFound from "./screens/NotFound";
import ContactUs from "./screens/ContactUs";
import MoviesPage from "./screens/Movies";
import SingleMovie from "./screens/SingleMovie";
import WatchPage from "./screens/WatchPage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/dashboard/Profile";
import Aos from "aos";
import Password from "./screens/dashboard/Password";
import FasvoritesMovies from "./screens/dashboard/FasvoritesMovies";
import MovieList from "./screens/dashboard/Admin/MovieList";
import Dashboard from "./screens/dashboard/Admin/Dashboard";
import Categories from "./screens/dashboard/Admin/Categories";
import Users from "./screens/dashboard/Admin/User";
import AddMovie from "./screens/dashboard/Admin/AddMovie";
import ScrollOnTop from "./ScrollOnTop";
import DrawerContext from "./context/DrawerContext";
import ToastContainer from "./components/notfications/ToastContainer";
import {
  AdminProtectedRouter,
  ProtectedRouter,
} from "./routes/ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./redux/Actions/categoriesAction";
import { getAllMoviesAction } from "./redux/Actions/moviesAction";
import { getFavoriteMoviesAction } from "./redux/Actions/userActions";
import toast from "react-hot-toast";

const App = () => {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeMovie);
  const { isError: catError } = useSelector((state) => state.categoryGetAll);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMoviesAction({}));
    if (userInfo) {
      dispatch(getFavoriteMoviesAction());
    }
    if (isError || catError) {
      toast.error("Something went wrong, please try again later.");
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
  }, [dispatch, userInfo, isError, catError, isSuccess]);
  return (
    <>
      <ToastContainer />
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            {/* ************** PUBLIC ROUTERS ************* */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:search" element={<MoviesPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />

            {/* *************** PRIVATE PUBLIC ROUTERS ************* */}
            <Route element={<ProtectedRouter />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<Password />} />
              <Route path="/favorites" element={<FasvoritesMovies />} />
            </Route>

            {/* *************** ADMIN ROUTERS ************* */}
            <Route element={<AdminProtectedRouter />}>
              <Route path="/movieslist" element={<MovieList />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/users" element={<Users />} />
              <Route path="/addmovie" element={<AddMovie />} />
            </Route>
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
};

export default App;
