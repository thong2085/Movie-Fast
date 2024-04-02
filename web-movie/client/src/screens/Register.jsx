import React from "react";
import Layout from "../layout/Layout";
import { Input } from "../components/UsedInput";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <div className="w-full 2xl:2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border-2 border-border">
          <img
            src="/logo.png"
            alt="logo"
            className="w-full h-20 object-contain"
          />
          <Input
            label="FullName"
            placeholder="Movies Fast"
            type="text"
            bg={true}
          />
          <Input
            label="Email"
            placeholder="moviesfast@gmail.com"
            type="email"
            bg={true}
          />
          <Input
            label="Password"
            placeholder="*********"
            type="password"
            bg={true}
          />
          <Link
            to="/dashboard"
            className="bg-subMain transitons hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full "
          >
            <FiLogIn />
            Sign Up
          </Link>
          <p className="text-center text-border">
            Already have an account?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
