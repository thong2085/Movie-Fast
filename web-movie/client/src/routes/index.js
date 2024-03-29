import HomePage from "../pages/HomePage/HomePage";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import WatchMovie from "../pages/WatchMovie/WatchMovie";

export const routes = [
  {
    path: "/",
    page: HomePage,
    IsShowHeader: true,
  },
  {
    path: "/movie/:id",
    page: MovieDetail,
    IsShowHeader: true,
  },
  {
    path: "/watch/:id",
    page: WatchMovie,
    IsShowHeader: true,
  },
  // {
  //   path: "/:type",
  //   page: TypeProductPage,
  // },
  // {
  //   path: "/*",
  //   page: NotFoundPage,
  // },
];
export default routes;
