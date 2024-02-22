
"use client"
import React, { useState } from "react";
import Head from 'next/head';
import styles from '../../styling/resetpassword.module.css';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { initiatePasswordReset } from "../lib/resetpassword";

export default function ResetPassword() {
    const [email, setEmail] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
      
        console.log(`the  email is : ${email}`);
        try{
          const response = await initiatePasswordReset(email);
          
          
      } catch (err) {
        console.log(err)
      }
        
      }

    return (
        <>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1>Find your account</h1>
          <hr/>
          <p>Please enter your email address to search for your account.</p>
          <div className= {styles.myContainer}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            Email: <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <div className="={styles.btnstyle}">
            <Link  href="../">
              <Button type="button" className={styles.mybutton}>Cancel</Button>
            </Link>
              <Button   type="submit" className={styles.mybutton} >Search</Button>
            </div>
            </form>
            </div>
       
          
          <hr/>
        </div>
      </div>
    </>

    );
}




