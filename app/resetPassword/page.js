
"use client"
import React, { useState } from "react";
import Head from 'next/head';
import styles from '../../styling/resetpassword.module.css';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { initiatePasswordReset } from "../lib/resetpassword";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);


    async function handleSubmit(e) {
        e.preventDefault();
        //if (isSubmitting) return; // If already submitting, ignore further submissions

        setIsSubmitting(true);

        console.log(`the  email is : ${email}`);
        try{
          const response = await initiatePasswordReset(email);
          console.log(`The response is ${response}`);
          if(response == true){
          setError("Please check your Email!");
          setIsSubmitting(true);
          
          }else{
            setError("User not found!");
            setIsSubmitting(false);
          }
          
          
      } catch (err) {
        console.log(`The error is ${err}`)
        setError("User not found!");
        
      }
        
      }

    return (
        <>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h2 className={styles.heading}>Find your account</h2>
          <hr/>
          <br/>
          <p>   Please enter your email address to search for your account.</p>
          <div className= {styles.myContainer}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input type="email" value={email} placeholder="Enter your Email" onChange={e => setEmail(e.target.value)}/>
            <hr/>
            <div className="={styles.btnstyle}">
            <Link  href="../">
              <Button type="button" className={styles.mybutton}>Cancel</Button>
            </Link>
              <Button   type="submit" className={styles.mybutton} disabled={isSubmitting}>Search</Button>
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




