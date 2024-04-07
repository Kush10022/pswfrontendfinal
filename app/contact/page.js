"use client";
// pages/contact.js
import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Image from 'next/image'
import { AssitiveFetch } from '../lib/assitivefetch';

export default function Contact() {
    const [name, setName] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [message, setMessage] = useState('');
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     message: '',
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const payload = {
        name: name,
        email: emailMessage,
        message: message
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await AssitiveFetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/sendemail`, 'POST', payload);
        // const response = await fetch('http://localhost:8080/v1/sendemail', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(payload)
        // });
        // const responseData = await response.json();
        // console.log('responseData:', responseData);
    };

    return (
        <div className='bg-emerald-100 w-screen h-dvh'>
            {/* <Container className='py-1'>
                <Row>
                    <Col xs={12} md={12} lg={12} xl={12} xxl={12}> */}
                        <div className='flex justify-center'>
                            <div className='w-5/6 h-dvh flex justify-center pt-16'>

                                <div className='w-4/6 h-5/6 bg-red-400'>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <Image
                                        src="/contactpgwimg.jpg"
                                        alt="Contact Us"
                                        fill
                                        style = {{objectFit:'cover'}}
                                        quality={100}
                                    />
                                    </div>
                                </div>

                
                                <div className='w-2/6 h-5/6 flex justify-center  border-2 border-emerald-900 rounded-2xl' >
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <Form onSubmit={handleSubmit}  className='p-2 font-semibold'>
                                        <div className='text-center p-6 font-extrabold'>Contact Us</div>

                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="string"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={emailMessage}
                                                placeholder="Enter your email"
                                                onChange={(e) => setEmailMessage(e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicMessage">
                                            <Form.Label>Message</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name="message"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                rows={6}
                                                placeholder="Your message"
                                                required
                                            />
                                        </Form.Group>

                                        <Button variant="outline-success" type="submit">
                                            Submit
                                        </Button>

                                    </Form>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <div> */}

                        {/* <div className='w-8'>

                        <div className='flex justify-center py-3'>

                            <Form onSubmit={handleSubmit} className="w-80 border-2 border-emerald-700 rounded-lg p-4">
                                
                                <div className='flex justify-center h-1/3 min-w-full'>
                                    <Image
                                        src="/contactpgwimg.jpg"
                                        alt="Contact Us"
                                        width={1200}
                                        height={500}
                                        quality={100}
                                    />
                                </div>

                                <Form.Group className="mb-1"><Form.Label>Contact Us</Form.Label></Form.Group>

                                <Form.Group className="mb-1" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-1" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-1" controlId="formBasicMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Your message"
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form>
                        </div>

                        </div>
                        </div> */}
                    {/* </Col>
                </Row>
            </Container> */}
        </div>
    );
}
