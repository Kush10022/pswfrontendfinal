import React, { useState } from "react";

const EditSvg = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <svg
        className="h-6 w-6 text-green-600 hover:text-green-800 cursor-pointer"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      {showTooltip && (
        <div className="absolute top-8 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded shadow-lg z-50">
          Edit
        </div>
      )}
    </div>
  );
};

const CloseSvg = ({ onClick }) => {
  return (
    <svg
      fill="none"
      height="800px"
      width="800px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1792 1792"
      xmlSpace="preserve"
      onClick={onClick}
    >
      <path d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4 c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1 c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z" />
    </svg>
  );
};

const ReplaceIconSvg = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-6 h-6 bg-white rounded-full">
      <svg
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-full h-full text-green-600 hover:text-green-800 cursor-pointer"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
        stroke="currentColor"
      >
        <path d="M20,37.5c0-0.8-0.7-1.5-1.5-1.5h-15C2.7,36,2,36.7,2,37.5v11C2,49.3,2.7,50,3.5,50h15c0.8,0,1.5-0.7,1.5-1.5V37.5z" />
        <path d="M8.1,22H3.2c-1,0-1.5,0.9-0.9,1.4l8,8.3c0.4,0.3,1,0.3,1.4,0l8-8.3c0.6-0.6,0.1-1.4-0.9-1.4h-4.7c0-5,4.9-10,9.9-10V6C15,6,8.1,13,8.1,22z" />
        <path d="M41.8,20.3c-0.4-0.3-1-0.3-1.4,0l-8,8.3c-0.6,0.6-0.1,1.4,0.9,1.4h4.8c0,6-4.1,10-10.1,10v6c9,0,16.1-7,16.1-16H49c1,0,1.5-0.9,0.9-1.4L41.8,20.3z" />
        <path d="M50,3.5C50,2.7,49.3,2,48.5,2h-15C32.7,2,32,2.7,32,3.5v11c0,0.8,0.7,1.5,1.5,1.5h15c0.8,0,1.5-0.7,1.5-1.5V3.5z" />
      </svg>
      {showTooltip && (
        <div className="absolute top-8 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded shadow-lg z-1000 overflow-auto">
          Change
        </div>
      )}
    </div>
  );
};

const ViewIconSvg = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-8 h-8">
      <svg
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-full h-full text-blue-600 hover:text-blue-800 cursor-pointer"
        fill="currentColor"
        viewBox="-3.5 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>View</title>
        <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path>
      </svg>
      {showTooltip && (
        <div className="absolute top-8 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded shadow-lg z-50">
          View
        </div>
      )}
    </div>
  );
};

export { EditSvg, CloseSvg, ReplaceIconSvg, ViewIconSvg };
