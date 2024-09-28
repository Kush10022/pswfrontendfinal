import { waitFor } from "@testing-library/react";
import React from "react";
import { toast } from "react-hot-toast";

const FilePicker = ({ uploader, onClose }) => {
  const [file, setFile] = React.useState(null);
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    // Check if a file is selected
    if (!selectedFile) {
      toast.error("No file selected!");
      return;
    }

    // Check file type (only PDF allowed)
    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed!");
      return;
    }

    // Check file size (1 MB max)
    const maxFileSizeInBytes = 1 * 1024 * 1024; // 1 MB in bytes
    if (selectedFile.size > maxFileSizeInBytes) {
      toast.error("File size should not exceed 1 MB!");
      return;
    }

    // If all checks pass, set the file
    try {
      setFile(selectedFile);
      await uploader(selectedFile);
      await waitFor(onClose, { timeout: 1000 });
    } catch (err) {
      toast.error("Error uploading file!");
    }
  };

  return (
    <div className="flex items-center space-x-4 m-6 p-5">
      {/* Custom label for file input */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200 shadow-md"
      >
        Choose File
      </label>

      {/* Hidden file input */}
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Display selected file or placeholder */}
      <span className="text-gray-700">
        {file ? file.name : "No file chosen"}
      </span>
    </div>
  );
};

export { FilePicker };
