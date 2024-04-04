import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const NotFound = () => {
  return (
    <div className="flex-colo w-full gap-6 min-h-screen lg:py-20 py-10 px-6">
      <img
        src="/images/404.jpg"
        alt="not found"
        className="w-full h-96 object-contain "
      />
      <h1 className="lg:text-4xl font-bold">Page Not Found</h1>
      <p className="font-medium text-border leading-6">
        The page you are looking for does not exist. You may have mistyped the
        URL
      </p>
      <Link
        to="/"
        className="bg-subMain flex-rows transitions gap-3 items-center text-white font-medium hover:text-main py-3 px-6  rounded-md"
      >
        <AiFillHome /> Back Home
      </Link>
    </div>
  );
};

export default NotFound;
