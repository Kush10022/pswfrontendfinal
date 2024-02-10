"use client";
import React, { useState } from "react";
import Head from 'next/head';
import styles from '../../styling/login.module.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
export default function Login() {
  return(
    <Container fluid>
        <Row>
        <Col className={styles.container} sm={12} md={12} lg={12} xl={12} xxl={12}>

            <Col className={styles.loginContainer} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <h1 className="text-danger">PSW Support and Care</h1>
            <h2></h2>
            <p>Welcome Back, Please login to your account.</p>
            <button className={styles.githubBtn}>Login with Google</button>
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
            </Col>

            <Col className={styles.infoContainer} sm={12} md={12} lg={4} xl={4} xxl={4}>
            {/* <button className={styles.hideBtn}>Hide</button> */}
            <h2>How we work?</h2>
            <p>Find out how are changing lives of hundreds of people needing special assitance.</p>
            <Link className={styles.playBtn} href="https://www.youtube.com/">▶️</Link>
            </Col>

        </Col>
        </Row>
    </Container>
  )
}
