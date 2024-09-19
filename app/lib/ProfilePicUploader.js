/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Cookies from "js-cookie";
import { userProfileAtom } from "../atoms/userAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

// Utility to create an image element from a data URL
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // Needed to avoid cross-origin issues
    image.src = url;
  });

// Calculates the cropped image from the source image and the pixel crop area
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size to the size of the cropped area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image onto the canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Convert the canvas to a data URL
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const buffer = new File([blob], "profilePic.jpeg", {
        type: "image/jpeg",
      });

      resolve(buffer);
    }, "image/jpeg");
  });
}

// Utility function to convert a Blob into a Data URL
const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

const ProfilePicUploader = ({ onDone }) => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [user, setUser] = useAtom(userProfileAtom);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Token not available");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/picture`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "image/jpeg",
            Authorization: `JWT ${token}`,
          },
          body: croppedImage,
        }
      );

      if (response.ok) {
        const data = await response.json();
        let myUser = user;
        myUser.profilePicture = data.url;
        setUser(myUser);
        router.refresh();
        onDone();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-5">
      {!imageSrc && (
        <input
          className="m-4 file-input text-sm text-grey-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
      )}
      {imageSrc && (
        <div className="relative w-96 h-96 mt-8 mb-10">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <button
            className="absolute inset-x-0 -bottom-12 mt-2 py-2 px-2 rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
            onClick={onCrop}
          >
            Crop Image
          </button>
        </div>
      )}
    </div>
  );
};

export { ProfilePicUploader };
