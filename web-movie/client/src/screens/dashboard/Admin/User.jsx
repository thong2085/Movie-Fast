import React from "react";
import SideBar from "../SideBar";
import Table2 from "../../../components/Table2";
import { UsersData } from "../../../data/MovieData";

const Users = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold text-white">Users</h2>
        </div>
        <Table2 data={UsersData} users={true} />
      </div>
    </SideBar>
  );
};

export default Users;
