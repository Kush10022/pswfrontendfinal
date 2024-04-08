"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAtom } from 'jotai';
import { userProfileAtom } from '../atoms/userAtom';
import { useAtomValue } from 'jotai';
import styles from '../../styling/login.module.css';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect } from 'react';
const EditProfile = () => {
   
    const user = useAtomValue(userProfileAtom);
    const [token, setToken] = useState('');
    const router = useRouter();
  console.log(user)
  const [formData, setFormData] = useState({
    fname: user?.fname || '',
    lname: user?.lname || '',
    isPSW: user?.isPSW || false,
  });

  let authTokenValue = ''
   
  useEffect(() => {
    // Check if running in client-side environment
    if (typeof window !== 'undefined') {
        // Access token logic here
        const authTokenString = document.cookie;
         authTokenValue = authTokenString.split('=')[1];
         setToken(authTokenValue)
        if (authTokenValue === '') {
            console.log("Access token not found, redirecting to login");
            router.push('/login');
        }
    }
}, [authTokenValue]); 
  // Use useState unconditionally
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });
  
      if (response.ok) {
        // User information updated successfully
        console.log('User information updated successfully');
        // Optionally, you can redirect the user to another page after successful update
        router.push('/profile'); // Redirect to profile page
      } else {
        // Handle error response
        console.error('Failed to update user information:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error updating user information:', error);
    }
  };


  const cancelPress=() =>{
router.push("/profile");
  }

  return(

  <Container fluid className={`min-h-screen d-flex align-items-center justify-content-center ${styles.editProfileContainer}`}> 
      <Row className="m-h-screen">
       
        <div className={`shadow p-5 ${styles.editProfileForm}`}>
          <div>
            <div  className='font-bold'><h2 className='text-xl text-center'>Edit Profile</h2></div>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='text-sm font-semibold'>First Name</Form.Label><Form.Control type="text" name="fname" value={formData.fname} onChange={handleChange}  />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label className='text-sm font-semibold'>Last Name</Form.Label><Form.Control type="text" name="lname" value={formData.lname} onChange={handleChange} />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Check className='text-sm font-semibold' label="Is PSW" type="checkbox" name="isPSW" checked={formData.isPSW} onChange={handleChange} />
            </Form.Group>
           
            <Button variant="success"  type="submit" className=" w-full mt-4 py-2  btn-success bg-success">Save</Button>
            <Button variant="danger"  type="submit" className=" w-full mt-4 py-2 btn-danger bg-danger"  onClick={cancelPress}>Cancel</Button>
            
          </Form>  
          </div>
          </div>
        
        </Row>
        </Container>

);
 
};
export default EditProfile;
