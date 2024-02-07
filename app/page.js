"use client";
import React, { useState } from "react";
import Head from 'next/head';
import styles from '../styling/login.module.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function Home() {
  return(
    <>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1 className="text-danger">PSW Support and Care</h1>
          <h2></h2>
          <p>Welcome Back, Please login to your account.</p>
          <button className={styles.githubBtn}>Login with Google</button>
          {/* <button className={styles.xingBtn}>Login with Xing</button> */}
          <div className={styles.orSeparator}>- OR -</div>
          <form className={styles.loginForm}>
            <input type="email" placeholder="Email Address" required />
            <input type="password" placeholder="Password" required />
            <div className={styles.rememberMe}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link  href="#" className={styles.forgotPassword}>Forgot password</Link>
            <Link  href="#">
              <Button type="submit" >Login</Button>
            </Link>
            <Link href="/registeruser">
              <Button  type="button" >Sign up</Button>
            </Link>
          </form>
          <p className={styles.terms}>
            By signing up, you agree to PSW Terms and Conditions & Privacy Policy
          </p>
        </div>
        <div className={styles.infoContainer}>
          {/* <button className={styles.hideBtn}>Hide</button> */}
          <h2>How we work?</h2>
          <p>Find out how are changing lives of hundreds of people needing special assitance.</p>
          <Link className={styles.playBtn} href="https://www.youtube.com/">▶️</Link>
        </div>
      </div>
    </>
  )
}
