import React, { useEffect } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInput";
import Rating from "../Stars";
import { Empty } from "../notfications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as MovieValidation from "../validation/MovieValidation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InlineError } from "../notfications/Error";
import { Link } from "react-router-dom";
import { createReviewAction } from "../../redux/Actions/moviesAction";

const Ratings = [
  {
    title: "0 - Poor",
    value: 0,
  },
  {
    title: "1 - Fair",
    value: 1,
  },
  {
    title: "2 - Good",
    value: 2,
  },
  {
    title: "3- Very Good",
    value: 3,
  },
  {
    title: "4 - Excellent",
    value: 4,
  },
  {
    title: "5 - Master Piece",
    value: 5,
  },
];
const MovieRates = ({ movie }) => {
  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector((state) => state.createReview);

  const { userInfo } = useSelector((state) => state.userLogin);

  // validate user
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MovieValidation.ReviewValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      createReviewAction({
        id: movie?._id,
        review: data,
      })
    );
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_REVIEW_RESET" });
    }
  }, [dispatch, isError]);
  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10  sm:p-20 rounded">
        {/* write review */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            Review "{movie?.name}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie. It will be posted on this page. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar
            ligula id eros varius, ornare tincidunt sem porta.
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Rating"
              options={Ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={watch("rating", false)} />
            </div>
          </div>
          {errors.rating && <InlineError text={errors.rating.message} />}
          {/* message */}
          <div className="w-full">
            <Message
              label="Message"
              name="comment"
              register={{ ...register("comment") }}
              placeholder="Make it short and sweet....."
            />
            {errors.comment && <InlineError text={errors.comment.message} />}
          </div>
          {userInfo ? (
            <button
              disabled={isLoading}
              type="submit"
              className="bg-subMain border-2 text-white py-4 w-full flex-colo hover:border-2 hover:border-subMain hover:bg-main rounded"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-main text-subMain  w-full flex-colo hover:bg-subMain hover:text-white py-4 rounded"
            >
              Login to review this movie
            </Link>
          )}
          {/* submit */}
        </form>
        {/* REVIEWS */}
        <div className="col-span-3 flex flex-col gap-6 w-full">
          <h3 className="text-xl text-text font-semibold ">
            Reviews ({movie?.numberOfReviews})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6  border-2 border-gray-800 h-header overflow-y-scroll">
            {movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review) => (
                <div
                  key={review?._id}
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border-2 border-gray-800 rounded"
                >
                  <div className="col-span-2  hidden md:block">
                    <img
                      src={review?.userImage}
                      alt={review?.userName}
                      className="w-full rounded-full object-cover"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2>{review?.userName}</h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review?.comment}
                    </p>
                  </div>
                  {/* rates */}
                  <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                    <Rating value={review?.rating} />
                  </div>
                </div>
              ))
            ) : (
              <Empty message={`Be first to rate ${movie?.name}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRates;
