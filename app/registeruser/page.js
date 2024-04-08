"use client";
import { Card, Form, Alert, Button, Container, Row,Col } from "react-bootstrap";
import { useState } from "react";
import { registerUsers } from "../lib/authenticate";
import { useRouter } from "next/navigation";
import { AssitiveFetch } from "../lib/assitivefetch";

export default function Register() {
  const [warning, setWarning] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [PSW, setPSW] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  function uploadPicture() {
    const fileInput = document.getElementById('profilePicture');
    const tokenInput = document.getElementById('token');
    if (fileInput.files.length > 0 && tokenInput.value.trim() !== "") {
        const file = fileInput.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('picture', file); // 'picture' is the field name you expect on the server

        fetch('http://localhost:9000/v1/private/user/picture', {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'multipart/form-data' is not required here; it's set automatically by the browser when using FormData
                'Content-Type': `${file.type}`,
                'Authorization': 'JWT ' + tokenInput.value.trim()
            },
            body: file
        })
        .then(async (response) => {
            if (!response.ok) {
                const resp = await response.json();
                console.log(resp);
                throw new Error('Network response was not ok');
            }
            return await response.json();
        })
        .then(data => {
            console.log(data);
            alert('Upload successful');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Upload failed. See console for details.');
        });
    } else {
        alert('Please select a file and enter a JWT token to upload');
    }
}



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        PSW: PSW,
      };

      const responseData = await AssitiveFetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, 'POST', payload);
    // if (responseData.status==='ok') {
    //     console.log('User registration successful', responseData);
    //     return responseData;
    // } else {
    //     console.log('User registration failed', responseData);
    //     return responseData;
    // }

      //const res = await registerUsers(email, password, firstName, lastName, PSW);
      console.log("res is:", responseData);
      if (responseData.status === "error" && responseData.error.message) {
        console.log("res.error.message is:", responseData.error.message);
        setWarning(responseData.error.message);
        return;
      }
      router.push("/afterEmailregister");
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
            <div  className='font-bold'><h2 className='text-xl text-center'>Register:</h2><h3 className='font-semibold text-lg text-center'>Create account to avail services</h3></div>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="fname" className='text-sm font-semibold'>First Name</Form.Label><Form.Control type="string" value={firstName} id="fname" name="fname" onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label htmlFor="lname" className='text-sm font-semibold'>Last Name</Form.Label><Form.Control type="string" value={lastName} id="lname" name="lname" onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label htmlFor="useremail" className='text-sm font-semibold'>Email:</Form.Label><Form.Control type="email" value={email} id="useremail" name="useremail" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label htmlFor="password" className='text-sm font-semibold'>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
              {/* <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)}/> */}
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Check className='text-sm font-semibold' label="Is PSW" type="checkbox" value={PSW} id="ispsw" name="ispsw" onChange={(e) => setPSW(e.target.checked)} />
            </Form.Group>
            {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
            {/* className="pull-right" */}
            <Button variant="primary" type="submit" className="w-full mt-4 py-2 text-black">Register</Button>
          </Form>  
          </div>
          </div>
        </Col>

        <Col md={6} lg={6} xl={6} xxl={6}>
              <div className='flex flex-col justify-center items-center h-full rounded-md mt-2 pt-10 pb-10  bg-emerald-600'>
                <div className='w-1/2'>
                  <h2 className='text-4xl text-slate-100 text-center font-bold'>PSW Support and Care</h2>
                  <p className=' text-slate-100 text-balance text-center font-semibold px-18'>Support Worker is an innovative online company dedicated to providing personal 
                  support services. Our mission is to offer accessible, high-quality assistance to individuals in need, directly 
                  through our online platform. By leveraging the power of technology, we connect clients with experienced personal
                   support workers who deliver compassionate care, tailored to each client's unique needs. Whether it's assistance 
                   with daily activities, health-related support, or companionship, our goal is to enhance the quality of life for 
                   those we serve. At Support Worker, we believe in creating a community of care that's just a click away, making
                    personal support more convenient and effective than ever before.</p>
                </div>
            </div>
        </Col>
      </Row>
    </Container>
  );
}