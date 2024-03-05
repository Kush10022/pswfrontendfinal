"use client";
import { Card, Form, Alert, Button, Container, Row,Col, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { newPasswordResetting } from "../lib/newpassword";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { Suspense } from "react";
import styles from '../../styling/resetpassword.module.css';

function GetQuery() {

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const router = useRouter();


  
  async function handleSubmit(e) {
    e.preventDefault();
   
  try{
    const response = await newPasswordResetting(token , password);
    console.log("Password reset successful");
    console.log(`password is : ${password}`);
    setError("Password Reset Successful!");
    router.push(`/login`);
    
} catch (err) {
  console.log(err)
  setError("Error in resetting password!");
}
}

  return (
    <>
    <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h2 className={styles.heading}>Enter your new Password</h2>
          <hr/>
          <br/>
          <p>   Please enter a new password for your account</p>
          <div className= {styles.myContainer}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input type="password" value={password} placeholder="New Password" onChange={e => setPassword(e.target.value)}/>
            <hr/>
            <div className="={styles.btnstyle}">
              <Button   type="submit" className={styles.mybutton} disabled={isSubmitting}>Change Password</Button>
            </div>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            </div>
       
          
          <hr/>
        </div>
      </div>

    
    
    </>
  );


}


export default function Newpassword(){
   
    return (
      <Suspense>
        <GetQuery/>
      </Suspense>
    )
    
}