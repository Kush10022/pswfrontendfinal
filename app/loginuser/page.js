"use client";
import React, { use, useState } from "react";
import Head from 'next/head';
import styles from '../../styling/login.module.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/navigation";
import { loginUsers } from "../lib/authenticateUsers";
import { Dashboardnew } from "../dashboard/page";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function submitLoginData(e){
    e.preventDefault();
    try{
      const loginRes = await loginUsers(email, password)
      console.log("loginRes is:",loginRes)
      if (loginRes.status === "error" && loginRes.error.message) {
        console.log("res.error.message is:", loginRes.error.message);
        return;
      }
      router.push('/dashboard')
    }catch(err){
      console.log(err)
    }
  }

  return(
    <Container fluid>
        <Row>
              <Col sm={12} md={12} lg={8} xl={8} xxl={8}>
                <div className="flex justify-center items-center h-screen bg-gray-100" >
                  <div className='w-3/5 bg-white p-8 rounded-lg shadow-md mr-8 flex flex-col items-center'>
                  <p className="text-2xl text-emerald-800">PSW Support and Care</p>
                  <p>Welcome Back, Please login to your account.</p>
                  <button className={styles.githubBtn}>Login with Google</button>
                  <div className={styles.orSeparator}>- OR -</div>
                  <form className={styles.loginForm}>
                      <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)}  />
                      <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                      <div className={styles.rememberMe}>
                      <input type="checkbox" id="rememberMe" />
                      <label htmlFor="rememberMe">Remember me</label>
                      </div>
                      <Link  href="/resetPassword" className={styles.forgotPassword}>Forgot password</Link>
                      <Link  href="#">
                      <Button type="submit" onClick={submitLoginData}>Login</Button>
                      </Link>
                      <Link href="/registeruser">
                      <Button  type="button" >Sign up</Button>
                      {/* <Button  type="button" >Sign up</Button> */}
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
