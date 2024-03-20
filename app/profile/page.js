"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../../styling/profile.module.css";

export let imgURL;

 const ProfilePage = () => {

  const [userProfile, setUserProfile] = useState(null);

    const router = useRouter();
    const [imageUrl, setImageUrl] = useState("https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png");

  imgURL = imageUrl;

  const retriveImg = async () => {

    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
      console.log("I didnt find access token!!!")
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/picture`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${accessToken}`,
        },
      });

      if (response.ok) {
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

    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
      console.log("I didnt find access token!!!")
      return;
    }
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${accessToken}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('User profile metadata fetched successfully', responseData);
        setUserProfile(responseData);
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

  return (
    <div className={styles.profileContainer}>
    <Container>
      <Row>
        <Col md={5} className={styles.leftColumn}>
          <div className={styles.imageContainer}>
            <img src={imageUrl} alt="User" className={styles.profileImage} />
          </div>
          <div className={styles.userInfo}>
            <p><strong>{userProfile?.user.fname} {userProfile?.user.lname}</strong> </p>
            <p>{userProfile?.user.email}</p>
            {userProfile?.user.isPSW ? <p>You are registered as a PSW</p> : <p>You are registered as a PSW</p>}
          </div>
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
