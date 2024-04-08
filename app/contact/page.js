"use client";
// pages/contact.js
// import { useState } from 'react';
// import { Container, Form, Button, Row, Col } from 'react-bootstrap';
// import Image from 'next/image'
// import { AssitiveFetch } from '../lib/assitivefetch';

// export default function Contact() {
//     const [name, setName] = useState('');
//     const [emailMessage, setEmailMessage] = useState('');
//     const [message, setMessage] = useState('');
//     // const [formData, setFormData] = useState({
//     //     name: '',
//     //     email: '',
//     //     message: '',
//     // });

//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setFormData({ ...formData, [name]: value });
//     // };

//     const payload = {
//         name: name,
//         email: emailMessage,
//         message: message
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await AssitiveFetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/sendemail`, 'POST', payload);
//         // const response = await fetch('http://localhost:8080/v1/sendemail', {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         //     body: JSON.stringify(payload)
//         // });
//         // const responseData = await response.json();
//         // console.log('responseData:', responseData);
//     };

//     return (
//         <div className='bg-emerald-100 w-screen h-dvh'>
//             {/* <Container className='py-1'>
//                 <Row>
//                     <Col xs={12} md={12} lg={12} xl={12} xxl={12}> */}
//                         <div className='flex justify-center'>
//                             <div className='w-5/6 h-dvh flex justify-center pt-16'>

//                                 <div className='w-4/6 h-5/6 bg-red-400'>
//                                     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                                     <Image
//                                         src="/contactpgwimg.jpg"
//                                         alt="Contact Us"
//                                         fill
//                                         style = {{objectFit:'cover'}}
//                                         quality={100}
//                                     />
//                                     </div>
//                                 </div>

                
//                                 <div className='w-2/6 h-5/6 flex justify-center  border-2 border-emerald-900 rounded-2xl' >
//                                     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                                     <Form onSubmit={handleSubmit}  className='p-2 font-semibold'>
//                                         <div className='text-center p-6 font-extrabold'>Contact Us</div>

//                                         <Form.Group className="mb-3" controlId="formBasicName">
//                                             <Form.Label>Name</Form.Label>
//                                             <Form.Control
//                                                 type="string"
//                                                 name="name"
//                                                 value={name}
//                                                 onChange={(e) => setName(e.target.value)}
//                                                 placeholder="Enter your name"
//                                                 required
//                                             />
//                                         </Form.Group>

//                                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                                             <Form.Label>Email address</Form.Label>
//                                             <Form.Control
//                                                 type="email"
//                                                 name="email"
//                                                 value={emailMessage}
//                                                 placeholder="Enter your email"
//                                                 onChange={(e) => setEmailMessage(e.target.value)}
//                                                 required
//                                             />
//                                         </Form.Group>

//                                         <Form.Group className="mb-3" controlId="formBasicMessage">
//                                             <Form.Label>Message</Form.Label>
//                                             <Form.Control
//                                                 as="textarea"
//                                                 name="message"
//                                                 value={message}
//                                                 onChange={(e) => setMessage(e.target.value)}
//                                                 rows={6}
//                                                 placeholder="Your message"
//                                                 required
//                                             />
//                                         </Form.Group>

//                                         <Button variant="outline-success" type="submit">
//                                             Submit
//                                         </Button>

//                                     </Form>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                         {/* <div> */}

//                         {/* <div className='w-8'>

//                         <div className='flex justify-center py-3'>

//                             <Form onSubmit={handleSubmit} className="w-80 border-2 border-emerald-700 rounded-lg p-4">
                                
//                                 <div className='flex justify-center h-1/3 min-w-full'>
//                                     <Image
//                                         src="/contactpgwimg.jpg"
//                                         alt="Contact Us"
//                                         width={1200}
//                                         height={500}
//                                         quality={100}
//                                     />
//                                 </div>

//                                 <Form.Group className="mb-1"><Form.Label>Contact Us</Form.Label></Form.Group>

//                                 <Form.Group className="mb-1" controlId="formBasicName">
//                                     <Form.Label>Name</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         placeholder="Enter your name"
//                                         required
//                                     />
//                                 </Form.Group>

//                                 <Form.Group className="mb-1" controlId="formBasicEmail">
//                                     <Form.Label>Email address</Form.Label>
//                                     <Form.Control
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         placeholder="Enter your email"
//                                         required
//                                     />
//                                 </Form.Group>

//                                 <Form.Group className="mb-1" controlId="formBasicMessage">
//                                     <Form.Label>Message</Form.Label>
//                                     <Form.Control
//                                         as="textarea"
//                                         name="message"
//                                         value={formData.message}
//                                         onChange={handleChange}
//                                         rows={3}
//                                         placeholder="Your message"
//                                         required
//                                     />
//                                 </Form.Group>

//                                 <Button variant="primary" type="submit">
//                                     Submit
//                                 </Button>

//                             </Form>
//                         </div>

//                         </div>
//                         </div> */}
//                     {/* </Col>
//                 </Row>
//             </Container> */}
//         </div>
//     );
// }


// pages/contact.js
import { useState } from 'react';
import Image from 'next/image'
import generalImage from '../../public/contactpgwimg.jpg';
import { AssitiveFetch } from '../lib/assitivefetch';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const { name, email, message } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name, email, message };
        await AssitiveFetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/sendemail`, 'POST', payload);
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-wrap justify-center'>
                    <div className='w-full lg:w-6/12 px-4'>
                        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-red-500'>
                            <img
                                src="/contactpgwimg.jpg"
                                alt="Contact Us"
                                style={{ objectFit: 'cover', width: '100%', height: '500px' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className='w-full lg:w-6/12 px-4'>
                        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white'>
                            <div className='rounded-t mb-0 px-6 py-6'>
                                <div className='text-center mb-3'>
                                    <h6 className='text-xl font-semibold'>Contact Us</h6>
                                </div>
                                <form onSubmit={handleSubmit} className='px-4'>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={handleChange}
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={message}
                                            onChange={handleChange}
                                            rows="4"
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Type a message..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
