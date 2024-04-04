import React from "react";
import SideBar from "../SideBar";
import Table from "../../../components/Table";
import { Movies } from "../../../data/MovieData";

const MovieList = () => {
  const sortedMovies = Movies.sort((a, b) => b.year - a.year);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold text-white">Movies List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain tex-white py-3 px-6 rounded">
            Delete All
          </button>
        </div>
        <Table data={sortedMovies} admin={true} />
      </div>
    </SideBar>
  );
};

export default MovieList;
