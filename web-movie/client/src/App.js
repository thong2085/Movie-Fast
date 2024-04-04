import React from "react";
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

const App = () => {
  Aos.init();
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/movie/:id" element={<SingleMovie />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/password" element={<Password />} />
      <Route path="/favorites" element={<FasvoritesMovies />} />
      <Route path="/movieslist" element={<MovieList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/users" element={<Users />} />
      <Route path="/addmovie" element={<AddMovie />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
