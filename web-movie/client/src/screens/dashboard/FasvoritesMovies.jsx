import React from "react";
import SideBar from "./SideBar";
import Table from "../../components/Table";
import { Movies } from "../../data/MovieData";

const FasvoritesMovies = () => {
  const sortedMovies = Movies.sort((a, b) => b.year - a.year);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold text-white">Favorites Movies</h2>
          <button className="bg-subMain  text-medium font-medium transitions hover:bg-main border-2 border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Delete All
          </button>
        </div>
        <Table data={sortedMovies} admin={false} />
      </div>
    </SideBar>
  );
};

export default FasvoritesMovies;
