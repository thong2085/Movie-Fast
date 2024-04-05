import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full py-4 px-2 flex-colo">
      <PuffLoader color="#f28f1a" />
    </div>
  );
};

export default Loader;
