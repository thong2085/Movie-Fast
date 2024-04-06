import React from "react";
import { useSelector } from "react-redux";

export const ImagePreview = ({ image, name }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className="w-32 mt-2 h-32 p-2 bg-main border-2 border-border rounded">
      <img
        src={
          image
            ? image
            : userInfo?.image
            ? userInfo?.image
            : "/images/movies/user.jpg"
        }
        alt={name}
        className="w-full h-full object-contain rounded"
      />
    </div>
  );
};
