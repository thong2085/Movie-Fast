import { useEffect } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../components/Table2";
// import { UsersData } from "../../../data/MovieData";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getAllUsersAction,
} from "../../../redux/Actions/userActions";
import Loader from "../../../components/notfications/Loader";
import { Empty } from "../../../components/notfications/Empty";

const Users = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );

  // delete favorite movies
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );

  // delete favorite movies handler
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete user?")) {
      dispatch(deleteUserAction(id));
    }
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold text-white">Users</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteUserHandler}
          />
        ) : (
          <Empty message="You don't have any user" />
        )}
      </div>
    </SideBar>
  );
};

export default Users;
