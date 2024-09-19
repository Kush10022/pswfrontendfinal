/* eslint-disable @next/next/no-img-element */
import React from "react";
import PropTypes from "prop-types";
import { EditSvg } from "./svgs";

ProfilePictureCard.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default function ProfilePictureCard({
  picture = "/user/defaultProfilePic.jpeg",
  name = "User",
  role = "Personal Support Worker",
  onClick = () => { console.log("Edit button clicked") },
}) {

  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }
  return (
    <div className="relative flex flex-col text-gray-700 bg-gray-100 rounded-xl" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative mx-4 mt-4 rounded-full shadow-lg flex items-center justify-center group">
        <img
          src={picture}
          alt="profile-picture"
          className="rounded-full"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        {isHovered && (
        <div className="absolute bottom-1 right-1 md:bottom-4 md:right-1 bg-white p-2 rounded-full shadow-lg border border-gray-200 transform group-hover:scale-100 transition-transform duration-150 ease-in-out" onClick={onClick}>
          <EditSvg />
        </div>
      )}
      </div>
      <div className="p-6 text-center">
        <h4 className="mb-2 text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900">
          {name}
        </h4>
        <p className="text-base font-small leading-relaxed text-slate-500">
          {role}
        </p>
      </div>
    </div>
  );
}
