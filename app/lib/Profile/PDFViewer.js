"use client";
import React from "react";

const PDFViewer = ({ fileUrl }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-[80vh] w-[50vw]">
      <iframe
        src={fileUrl}
        className="w-full h-full"
        title="PDF Viewer"
        style={{
          border: "none", // Remove default border
        }}
      />
    </div>
  );
};

export { PDFViewer };
