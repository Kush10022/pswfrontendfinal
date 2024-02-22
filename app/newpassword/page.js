"use client";
import { Card, Form, Alert, Button, Container, Row,Col, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { resetPassword } from "../lib/newpassword";
import { useRouter } from "next/navigation";


export default function newpassword(){

    
    
   
    const [password, setPassword] = useState("");

    const router = useRouter();
  
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const res = await resetPassword(password);
        console.log("res is:", res);
        if (res.status === "error" && res.error.message) {
          console.log("res.error.message is:", res.error.message);
          setWarning(res.error.message);
          return;
        }
        
      } catch (err) {
        setWarning(err.message);
      }
    }
  
    return (
      //  without the container fluid the bottom and horizontal scroll bar will appear
      //  the min-h-screen is to make the page full height
      <Container fluid className="min-h-screen"> 
        <Row className="min-h-screen">
          <Col xs={12} md={6} lg={6} xl={6} xxl={6}>
          <div className='w-10/12 justify-center items-center px-20'>
            <div>
              <div  className='font-bold'><h2 className='text-xl text-center'></h2><h3 className='font-semibold text-lg text-center'>Enter New Password</h3></div>
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className='text-sm font-semibold'>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                {/* <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)}/> */}
              </Form.Group>
              <br />
              
              <Button variant="primary" type="submit" className="w-full mt-4 py-2 text-black">Change Password</Button>
            </Form>  
            </div>
            </div>
          </Col>
  
          
        </Row>
      </Container>
    );
}