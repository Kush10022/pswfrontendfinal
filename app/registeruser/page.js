"use client";
// import React from 'react';
// import styles from '../../styling/registeruser.module.css'; // Import our CSS module

// export default function RegistrationForm(){
//   return (
//     <div className={styles.formContainer}>
//       <form className={styles.registrationForm}>
//         <h2>User Registration</h2>
        
//         <label htmlFor="firstName">First Name*</label>
//         <input type="text" id="firstName" name="firstName" required />
        
//         <label htmlFor="lastName">Last Name*</label>
//         <input type="text" id="lastName" name="lastName" required />
        
//         <label htmlFor="email">Email Address*</label>
//         <input type="email" id="email" name="email" required />
        
//         <label htmlFor="dob">Date of Birth*</label>
//         <input type="date" id="dob" name="dob" required />
        
//         <label htmlFor="phone">Phone Number*</label>
//         <input type="tel" id="phone" name="phone" required />
        
//         <label htmlFor="participation">Will you be running or walking?*</label>
//         <select id="participation" name="participation" required>
//           <option value="">Choose One</option>
//           <option value="running">Running</option>
//           <option value="walking">Walking</option>
//         </select>
        
//         <button type="submit" className={styles.submitButton}>Continue</button>
//       </form>
//     </div>
//   );
// };


import styles from '../../styling/registeruser.module.css'; 
import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState} from "react";
import { registerUsers } from "../authenticate/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react"; 
export default function Register() {
  const [warning, setWarning] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [PSW, setPSW] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const colorArray = ['warning', 'primary', 'success','danger','info','secondary'];
  const [bordercolor, setBordercolor]= useState(0);
  //within 3 seconds border color change from info to primary to success
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setBordercolor((prevIndex) => (prevIndex + 1) % colorArray.length);
    }, 1000); // Change to the next color after 1 second

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentBordercolor = colorArray[bordercolor];

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        await registerUsers(email, password, firstName, lastName, PSW);
        //router.push("/authenticate");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className={`p-5`} style={{ width: '30%' }}>
      <Card bg="dark"  className={`border border-${currentBordercolor} p-3`}>
        <Card.Body style={{color:"white"}}><h2>Register:</h2>Register as a new user to avail our services:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label><Form.Control type="string" value={firstName} id="fname" name="fname" onChange={(e) => setFirstName(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Last Name</Form.Label><Form.Control type="string" value={lastName} id="lname" name="lname" onChange={(e) => setLastName(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Email:</Form.Label><Form.Control type="email" value={email} id="useremail" name="useremail" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          {/* <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)}/> */}
        </Form.Group>
        {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
        <br />
        <Form.Group>
          <Form.Check label="Is PSW" type="checkbox" value={PSW} id="ispsw" name="ispsw" onChange={(e) => setPSW(e.target.checked)}/>
        </Form.Group>
        <br />
        <Button variant="dark" className="pull-right" type="submit">Register</Button>
      </Form>
    </div>
  );
}