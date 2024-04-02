import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AboutUs from "./screens/AboutUs";
import NotFound from "./screens/NotFound";
import ContactUs from "./screens/ContactUs";
import MoviesPage from "./screens/Movies";
import SingleMovie from "./screens/SingleMovie";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/movie/:id" element={<SingleMovie />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
