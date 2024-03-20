"use client";
import React, { useState } from "react";
import Head from 'next/head';
import styles from '../../styling/login.module.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [StatusMessage, setStatusMessage] = useState("");


  // function setToken(token) {
  //   localStorage.setItem('access_token', token);
  // }
  function setCookie(name, value, hours) {
    let expires = "";
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=Strict";
  }


  async function handleSubmit(e) {

    e.preventDefault();
    const payload = {
      email: email,
      password: password
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      // console.log('response', response);
      const responseData = await response.json();

      if (response.status === 403) {
        setStatusMessage("Please verify your email before logging in or check your email for verification link.")
      }
      else if (response.ok) {
        // setToken(responseData.token);
        setCookie('authToken', responseData.token, 24); // Sets a cookie named 'authToken' with the token value, expiring in 24 hours.
        router.push('/dashboard');
        // console.log('User login successful', responseData);
      } else {
        setStatusMessage("Please enter a valid email and password")
        // console.log('User login failed', responseData);
      }
    } catch
    (error) {
      console.error('Error during user login', error);
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={12} lg={8} xl={8} xxl={8}>
          <div className="flex justify-center items-center h-screen bg-gray-100" >
            <div className='w-3/5 bg-white p-8 rounded-lg shadow-md mr-8 flex flex-col items-center'>
              <p className="text-2xl text-emerald-800">PSW Support and Care</p>
              <p>Welcome Back, Please login to your account.</p>
              <button className={styles.githubBtn}>Login with Google</button>
              <div className={styles.orSeparator}>- OR -</div>
              <form className={styles.loginForm} onSubmit={handleSubmit}>
                <input type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <input type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <div className={styles.rememberMe}>
                  {StatusMessage && <p className={styles.error} >{StatusMessage}</p>}
                </div>
                <Link href="/resetPassword" className={styles.forgotPassword}>Forgot password</Link>
                {/* <Link href="#"> */}
                <Button type="submit">Login</Button>
                {/* </Link> */}
                <Link href="/registeruser">
                  <Button type="button" >Sign up</Button>
                </Link>
              </form>
              <p className={styles.terms}>
                By signing up, you agree to PSW Terms and Conditions & Privacy Policy
              </p>
            </div>
          </div>
        </Col>

        <Col sm={12} md={12} lg={4} xl={4} xxl={4}>
          <div className="flex justify-center items-center h-screen bg-gray-100" >
            <div className="w-3/5 p-8 bg-green-700 rounded-lg text-white text-center relative">
              {/* <button className={styles.hideBtn}>Hide</button> */}
              <h2>How we work?</h2>
              <p>Find out how are changing lives of hundreds of people needing special assitance.</p>
              <Link className={styles.playBtn} href="https://www.youtube.com/" style={{ textDecoration: 'none' }}>▶️</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
