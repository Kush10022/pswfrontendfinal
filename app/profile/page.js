"use client"
import React, { useState, useEffect } from "react";
import { useAtom } from 'jotai';
import { userProfileAtom } from '../atoms/userAtom';
import { useRouter } from "next/navigation";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "../../styling/profile.module.css";

export let imgURL;

 const ProfilePage = () => {

  const [userProfile, setUserProfile] = useState(null);
  const [, setUserProfileAtom] = useAtom(userProfileAtom);

    const router = useRouter();
    const [imageUrl, setImageUrl] = useState("https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png");
    const [authToken, setAuthToken] = useState('');
    const [uploadVisible, setUploadVisible] = useState(false);

    useEffect(() => {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});
      
      const authTokenValue = cookies['authToken'];
      console.log(`The val is ${authTokenValue}`)
      setAuthToken(authTokenValue)
    }, [authToken]);


  imgURL = imageUrl;

  const retriveImg = async () => {

     //const accessToken = document.cookie.getItem('authToken')
     const authTokenString = document.cookie
     console.log(document.cookie)
     const authTokenValue = authTokenString.split('=')[1];
     console.log(`The authtkebfjhb is ${authTokenValue}`)
    if (authTokenValue == '') {
      console.log("I didnt find access token!!!")
      //router.push('/login');
      //return;
    }
    else{
      console.log(" Yessss Ifind access token!!!")
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/picture`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${authTokenValue}`,
        },
      });

      if (response.ok) {
        if (response.headers.get('Content-Type').includes('application/json')) {
          const obj = await response.json();

          setImageUrl(obj.url);
          //return response.json(); // Assuming the response is a JSON object
      } 
        const resImage = await response.blob();
        const myimage_url = URL.createObjectURL(resImage);
        setImageUrl(myimage_url);
        imgURL = imageUrl;
      } 

      else if(response.status == 404) {
        console.log("No image Provided")
      }

      else {
        console.log("Something went wrong")
      }

    } catch (error) {
      console.log(error)
    }

  }

  const retriveUser = async () => {

    //const accessToken = document.cookie.getItem('authToken')
    const authTokenString = document.cookie
    //console.log(document.cookie)
    const authTokenValue = authTokenString.split('=')[1];
    //console.log(`The authtkebfjhb is ${authTokenValue}`)
   if (authTokenValue == '') {
     console.log("I didnt find access token!!!")
     router.push('/login');
     return;
   }
   else{
     console.log(" Yessss Ifind access token!!!")
   }
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${authTokenValue}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('User profile metadata fetched successfully', responseData);
        setUserProfile(responseData);
        //console.log(typeof(responseData))
        setUserProfileAtom(responseData.user);
      } 
      else {
        console.log('Failed to fetch user profile metadata', responseData);
        throw new Error(responseData.message || 'Failed to fetch user profile metadata');
      }
    } 
    catch (error) {
      console.error('Error fetching user profile metadata', error);
      throw new Error('Error fetching user profile metadata');
    }
  }

  useEffect(() => {
    retriveImg();
    retriveUser();
  }, [])

  const handleImageClick = () => {
    if (uploadVisible){
    setUploadVisible(false);
    }
    else
    {
      setUploadVisible(true);
    } // Show the upload button when profile image is clicked
  };

  const handleEditProfileClick = () => {
   
  router.push(`/editProfile`);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0 && authToken !== "") {
      const file = event.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('picture', file); // 'picture' is the field name you expect on the server

      fetch('https://sfapi.ujjval.de/v1/private/user/picture', {
          method: 'PUT',
          headers: {
              // 'Content-Type': 'multipart/form-data' is not required here; it's set automatically by the browser when using FormData
              'Content-Type': `${file.type}`,
              'Authorization': 'JWT ' + authToken
          },
          body: file
      })
      .then(async (response) => {
          if (!response.ok) {
              const resp = await response.json();
              console.log(resp);
              throw new Error('Network response was not ok');
          }
          return await response.json();
      })
      .then(data => {
          console.log(data);
          setUploadVisible(false);
          alert('Upload successful, Refresh the page to see changes');
          window.location.reload();
      })
      .catch((error) => {
          console.error('Error:', error);
          alert('Upload failed. See console for details.');
      });
  } else {
      alert('Please select a file and enter a JWT token to upload');
  }


    console.log("File uploaded:", event.target.files[0]);
  };


  return (
    <div className={styles.profileContainer}>
    <Container>
      <Row>
        <Col md={5} className={styles.leftColumn}>
          <div className={styles.imageContainer}>
          <img 
                src={imageUrl} 
                alt="User" 
                className={styles.profileImage} 
                onClick={handleImageClick} 
                style={{ cursor: 'pointer' }} // Set cursor to pointer to indicate it's clickable
              />
          </div>
          {/* Upload button */}
      {uploadVisible && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <div className={styles.userInfo}>
            <strong>Upload a new Profile Picture</strong><br/><br/>
          </div>
          </div>)}
          <div className={styles.userInfo}>
            <p><strong>{userProfile?.user.fname} {userProfile?.user.lname}</strong> </p>
            <p>{userProfile?.user.email}</p>
            {userProfile?.user.isPSW ? <p>You are registered as a PSW</p> : <p>You are not registered as a PSW</p>}
          </div>
          <Button variant="success"  className=" mt-4 py-2 ml-12  btn-success bg-success" onClick={handleEditProfileClick}>Edit Profile</Button>
        </Col>
        <Col md={4} className={styles.bookings}>
          <div className={styles.bookingInfo}>
            <p  >Recent Bookings</p>
          </div>
          <p className={styles.greyText}>Your recent bookings will appear here</p>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default ProfilePage;




