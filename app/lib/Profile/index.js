"use client";
/* eslint-disable @next/next/no-img-element */

// Importing Libraries
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Calendar from "react-calendar";
import { useAtom } from "jotai";
import { userProfileAtom } from "../atoms";
import { useRouter } from "next/navigation";
import { Modal } from "react-responsive-modal";

// Importing Components
import { SmallMap as DynamicMap } from "../Map";
import { ProfilePictureCard } from "./ProfilePictureCard";
import { ProfilePicUploader } from "./ProfilePicUploader";
import { PDFViewer } from "./PDFViewer";
import { EditSvg, ViewIconSvg } from "../svgs";
import { FilePicker } from "./FilePicker";
import { PersonalInfo } from "./PersonalInfo";
import { AvailabilityCalendar } from "./ProfileCalander";
import { AddressEditor } from "../Address";

// Importing Styling Sheets
import "react-calendar/dist/Calendar.css"; // Import calendar styling
import "../../../styling/calendar.css"; // Import custom CSS
import "react-responsive-modal/styles.css"; // Import modal styling

const futureLimitMonths = 2; // Number of months in the future that the user can book off

export default function ProfilePage() {
  const [user, setUser] = useAtom(userProfileAtom);
  const [open, setOpen] = useState(false);
  const [profilePicEdit, setProfilePicEdit] = useState(false);
  const [documentView, setDocumentView] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    user?.profilePicture || "/default-profile.jpg"
  );
  const [document, setDocument] = useState(
    user?.document || "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK"
  );
  const router = useRouter();
  console.log("User:", user);
  // Edit Hovers
  const [addressHover, setAddressHover] = useState(false);
  const [personalInfoHover, setPersonalInfoHover] = useState(false);
  const [personalInfoEdit, setPersonalInfoEdit] = useState(false);
  const [upcomingBookingsHover, setUpcomingBookingsHover] = useState(false);
  const [calendarHover, setCalendarHover] = useState(false);
  const [documentHover, setDocumentHover] = useState(false);
  const [documentEdit, setDocumentEdit] = useState(false);
  const [editCalendar, setEditCalendar] = useState(false);
  const [addressEdit, setAddressEdit] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setProfilePicEdit(false);
    setDocumentView(false);
    setDocumentEdit(false);
    setPersonalInfoEdit(false);
    setEditCalendar(false);
    setAddressEdit(false);
    setImageUrl(user?.profilePicture || imageUrl);
    setDocument(user?.document || document);
    router.refresh();
  };

  useEffect(() => {
    const getUserObject = async () => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          throw new Error("Token not available");
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`,
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const responseData = await response.json();
        setUser(responseData?.user);
        setImageUrl(responseData?.user?.profilePicture || imageUrl);
        setDocument(responseData?.user?.document || document);
      } catch (error) {
        console.error("Error fetching user object:", error);
      }
    };

    if (!user) {
      getUserObject();
    }
  }, [setUser, imageUrl, setImageUrl, document, setDocument, user]);

  const handleProfilePicChange = () => {
    setProfilePicEdit(true);
    onOpenModal();
  };

  const handlePersonalInfoEdit = async (data) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Token not available");
      }

      const modifiedData = {
        fname: data?.fname === "" ? user.fname : data.fname,
        lname: data?.lname === "" ? user.lname : data.lname,
        phone: data?.phone,
        mobile: data?.mobile,
        isPSW: data?.isPSW,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`,
        {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(modifiedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update personal info");
      }

      setUser({
        ...user,
        fname: modifiedData.fname,
        lname: modifiedData.lname,
        isPSW: modifiedData.isPSW,
        phone: modifiedData.phone,
        mobile: modifiedData.mobile,
      });
    } catch (error) {
      const message =
        error.message || "An error occurred while saving your information";
      throw new Error(message);
    }
  };

  const documentUpload = async (file) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Token not available");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/document`,
        {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`,
            "content-type": "application/pdf",
          },
          body: file,
        }
      );

      if (!response.ok) {
        toast.error("Error uploading document!");
        return;
      }

      const responseData = await response.json();
      setUser({ ...user, document: responseData.url });
      toast.success("Document uploaded successfully!");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  // Helper to format dates (yyyy-mm-dd)
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const isTileDisabled = ({ date }) => {
    const today = new Date();
    const futureLimit = new Date(
      today.getFullYear(),
      today.getMonth() + futureLimitMonths,
      today.getDate()
    );

    if (user?.calendar?.availableDays) {
      if (date < today || date > futureLimit) return true;
      const availableDays = user.calendar.availableDays;
      const formattedDate = formatDate(date);
      return !availableDays.includes(formattedDate);
    }
    return date < today || date > futureLimit;
  };

  const handleAddressSubmit = async (address) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Token not available");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/address`,
        {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(address),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update address");
      }

      const responseData = await response.json();

      setUser({
        ...user,
        address: responseData.address,
      });
    } catch (error) {
      console.error("Error updating address:", error);
      throw new Error("Error updating address");
    }
  };

  return (
    <div className="container mx-auto mb-10 px-4 pb-4 bg-white1 ">
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          modal: {
            marginTop: "10vh", // 10% from the top
          },
        }}
      >
        {profilePicEdit && <ProfilePicUploader onDone={onCloseModal} />}
        {documentView && <PDFViewer fileUrl={document} />}
        {documentEdit && (
          <FilePicker uploader={documentUpload} onClose={onCloseModal} />
        )}
        {personalInfoEdit && (
          <PersonalInfo
            onClose={onCloseModal}
            submit={handlePersonalInfoEdit}
            user={user ? user : {}}
          />
        )}
        {editCalendar && <AvailabilityCalendar onClose={onCloseModal} />}
      </Modal>

      {addressEdit && (
        <Modal
          open={open}
          onClose={onCloseModal}
          center
          styles={{
            modal: {
              marginTop: "10vh", // 10% from the top
              width: "80vw", // 80% of the viewport width
              maxWidth: "none", // Remove any max-width restrictions if needed
            },
          }}
        >
          <AddressEditor Submit={handleAddressSubmit} Close={onCloseModal} />
        </Modal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Column (Profile Pic and Credential Document) */}
        <div className="col-span-1 md:col-span-1 md:sticky top-4 h-fit flex flex-col space-y-4">
          {/* Profile Picture - 3/5 height */}
          <div className="flex-grow bg-gray-100 p-4 rounded-md">
            <ProfilePictureCard
              picture={imageUrl}
              role={user?.isPSW ? "Personal Support Worker" : "Client"}
              name={user ? `${user.fname} ${user.lname}` : "SF User"}
              onClick={handleProfilePicChange}
            />
          </div>

          {/* Credential Document Section - 2/5 height */}
          <div className="flex-grow bg-gray-100 p-4 rounded-md h-auto overflow-y-auto">
            <h2 className="text-lg font-bold mb-2">Credential Documents</h2>
            <div
              className="flex justify-between items-center mb-2 pr-1 pl-1 bg-white rounded-md shadow-sm"
              onMouseEnter={() => setDocumentHover(true)}
              onMouseLeave={() => setDocumentHover(false)}
            >
              <span className="text-md pt-3 pb-3 pl-1">Certificate</span>
              {documentHover && (
                <div className="flex space-x-2">
                  <button
                    className="text-blue-500 rounded-full bg-white p-1 shadow-sm border border-gray-200"
                    onClick={() => {
                      setDocumentView(true);
                      onOpenModal();
                    }}
                  >
                    <ViewIconSvg />
                  </button>
                  <button
                    className="text-green-500 rounded-full bg-white p-1 shadow-sm w-10 border border-gray-200"
                    onClick={() => {
                      setDocumentEdit(true);
                      onOpenModal();
                    }}
                  >
                    <EditSvg />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 md:col-span-3 pt-3 overflow-auto">
          {/* Personal Info Section (Split into two side-by-side sections) */}
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h2 className="text-lg font-bold mb-4">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Section 1: Personal Info */}
              <div
                className="relative bg-white p-4 rounded-md shadow-sm"
                onMouseEnter={() => setPersonalInfoHover(true)}
                onMouseLeave={() => setPersonalInfoHover(false)}
              >
                <p className="mt-2 p-2">
                  <strong>First Name:</strong> {user ? `${user.fname}` : "N/A"}
                </p>
                <p className="mt-2 p-2">
                  <strong>Last Name:</strong> {user ? `${user.lname}` : "N/A"}
                </p>
                <p className="mt-2 p-2">
                  <strong>Email:</strong> {user?.email || "N/A"}
                </p>
                <p className="mt-2 p-2">
                  <strong>Phone (Home):</strong> {user?.phone || "N/A"}
                </p>
                <p className="mt-2 p-2">
                  <strong>Mobile (Cell):</strong> {user?.mobile || "N/A"}
                </p>

                {/* Edit button */}
                {personalInfoHover && (
                  <button
                    className="absolute top-4 right-4 bg-white text-white p-2 shadow-sm border border-gray-200 rounded-full "
                    onClick={() => {
                      setPersonalInfoEdit(true);
                      onOpenModal();
                    }}
                  >
                    <EditSvg />
                  </button>
                )}
              </div>

              {/* Section 2: Address Info */}
              <div
                className="relative bg-white p-4 rounded-md shadow-sm"
                onMouseEnter={() => setAddressHover(true)}
                onMouseLeave={() => setAddressHover(false)}
              >
                <h5 className="font-bold">Address</h5>
                <p>
                  {user?.address?.address ||
                    "Could you kindly provide your address for client searches?"}
                </p>

                {user?.address?.location?.coordinates && (
                  <div className="mt-2 rounded-md w-full sm:w-11/12 md:w-96 lg:w-104 xl:w-128 2xl:w-144 h-64 sm:h-72 md:h-56 lg:h-64 xl:h-72 2xl:h-80">
                    <DynamicMap
                      location={{
                        latitude: user.address.location.coordinates[1],
                        longitude: user.address.location.coordinates[0],
                      }}
                      zoom={17}
                    />
                  </div>
                )}

                {!user?.address?.address && (
                  <img
                    src="https://via.placeholder.com/300"
                    alt="Address Placeholder"
                    className="mt-2 rounded-md"
                  />
                )}
                {/* Edit button */}
                {addressHover && (
                  <button
                    className="absolute top-4 right-4 bg-white text-white p-2 shadow-sm border border-gray-200 rounded-full "
                    onClick={() => {
                      setAddressEdit(true);
                      onOpenModal();
                    }}
                  >
                    <EditSvg />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Bookings and Calendar side-by-side */}
          <div
            className={`${
              user?.isPSW ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""
            }`}
          >
            {/* Upcoming Bookings */}
            <div
              className="relative bg-gray-100 p-4 rounded-md shadow-sm"
              onMouseEnter={() => setUpcomingBookingsHover(true)}
              onMouseLeave={() => setUpcomingBookingsHover(false)}
            >
              <h2 className="text-lg font-bold mb-4">Upcoming Bookings</h2>
              <ul>
                {user?.bookings?.length ? (
                  user.bookings.map((booking, index) => {
                    // Calculate the date minus one day
                    const appointmentDate = new Date(booking.appointmentDate);
                    appointmentDate.setDate(appointmentDate.getDate());
                    const formattedDate = appointmentDate
                      .toISOString()
                      .split("T")[0]; // Format the date as YYYY-MM-DD

                    return (
                      <li key={index} className="mb-2">
                        <strong>Booking {index + 1}:</strong> Date:{" "}
                        {formattedDate} with{" "}
                        {user?.isPSW ? booking.client.name : booking.psw.name}
                      </li>
                    );
                  })
                ) : (
                  <p>No upcoming bookings.</p>
                )}
              </ul>
              {upcomingBookingsHover && (
                <button className="absolute top-4 right-4 bg-white  p-2 shadow-sm border border-gray-200 rounded-full ">
                  <EditSvg />
                </button>
              )}
            </div>

            {/* Calendar */}
            {user && user?.isPSW && (
              <div
                className="relative bg-gray-100 p-4 rounded-md shadow-sm"
                onMouseEnter={() => setCalendarHover(true)}
                onMouseLeave={() => setCalendarHover(false)}
              >
                <h2 className="text-lg font-bold mb-3">Calendar</h2>
                <div className="mt-2 mb-2 flex justify-center space-x-8 bg-gray-200 p-1 rounded-lg shadow-md">
                  <span className="flex items-center space-x-2">
                    <span className="inline-block w-4 h-4 bg-white rounded-full border-1 border-teal-100"></span>
                    <span className="text-gray-700">Available</span>
                  </span>

                  <span className="flex items-center space-x-2">
                    <span className="inline-block w-4 h-4 bg-gray-300 rounded-full border-1 border-gray-400"></span>
                    <span className="text-gray-700">Unavailable</span>
                  </span>
                </div>
                <Calendar locale="en-CA" tileDisabled={isTileDisabled} />
                {calendarHover && (
                  <button
                    className="absolute top-4 right-4 bg-white  p-2 shadow-sm border border-gray-200 rounded-full "
                    onClick={() => {
                      setEditCalendar(true);
                      onOpenModal();
                    }}
                  >
                    <EditSvg />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
