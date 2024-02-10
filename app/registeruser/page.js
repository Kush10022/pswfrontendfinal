"use client";
import styles from '../../styling/registeruser.module.css';
import { Card, Form, Alert, Button, Container, Row,Col } from "react-bootstrap";
import { useState } from "react";
import { registerUsers } from "../lib/authenticate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Register() {
  const [warning, setWarning] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [PSW, setPSW] = useState(false);
  const [password, setPassword] = useState("");
  const colorArray = ['warning', 'primary', 'success', 'danger', 'info', 'secondary'];
  const [bordercolor, setBordercolor] = useState(0);

  //within 3 seconds b  order color change from info to primary to success
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
      const res = await registerUsers(email, password, firstName, lastName, PSW);
      console.log("res is:", res);
      if (res.status === "error" && res.error.message) {
        console.log("res.error.message is:", res.error.message);
        setWarning(res.error.message);
        return;
      }
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    //  without the container fluid the bottom and horizontal scroll bar will appear
    <Container fluid> 
      <Row>

        <Col className={styles.formContainer} xs={12} md={6} lg={4} xl={4} xxl={4}>
          <Card bg="dark" className={`border border-${currentBordercolor} p-3`}>
            <Card.Body style={{ color: "white" }}><h2>Register:</h2>Register as a new user to avail our services:</Card.Body>
          </Card>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name</Form.Label><Form.Control type="string" value={firstName} id="fname" name="fname" onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Last Name</Form.Label><Form.Control type="string" value={lastName} id="lname" name="lname" onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Email:</Form.Label><Form.Control type="email" value={email} id="useremail" name="useremail" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
              {/* <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)}/> */}
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Check label="Is PSW" type="checkbox" value={PSW} id="ispsw" name="ispsw" onChange={(e) => setPSW(e.target.checked)} />
            </Form.Group>
            {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
            {/* className="pull-right" */}
            <Button className={styles.submitButton} variant="dark" type="submit">Register</Button>
          </Form>
        </Col>

      </Row>
    </Container>
  );
}