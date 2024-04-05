import React from "react";

export const ImagePreview = ({ image, name }) => {
  return (
    <div className="w-32 mt-2 h-32 p-2 bg-main border-2 border-border rounded">
      <img
        src={image ? image : "/images/movies/user.jpg"}
        alt={name}
        className="w-full h-full object-contain rounded"
      />
    </div>
  );
};
