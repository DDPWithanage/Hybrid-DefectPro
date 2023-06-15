import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./contactUs.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contactus(){

    const handleSubmit = () => {
        const nameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        const phoneNumberInput = document.getElementById('phoneNumber');
        const messageInput = document.getElementById('message');
        const email = emailInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();
            
        if (!emailRegex.test(email)) {
            emailInput.classList.add('invalid');
            emailInput.nextElementSibling.style.display = 'block';
            toast.error('Please enter a valid email address.');
            return;
        }
        
        if (!/^\d+$/.test(phoneNumber)) {
            phoneNumberInput.classList.add('invalid');
            phoneNumberInput.nextElementSibling.style.display = 'block';
            toast.error('Please enter a valid phone number.');
            return;
        }
        
        // Clear form fields
        nameInput.value = '';
        emailInput.value = '';
        phoneNumberInput.value = '';
        messageInput.value = '';

        // Remove invalid styling and hide the error message
        emailInput.classList.remove('invalid');
        emailInput.nextElementSibling.style.display = 'none';
        phoneNumberInput.classList.remove('invalid');
        phoneNumberInput.nextElementSibling.style.display = 'none';
        
        // Display success toast message
        toast.success('Message sent successfully!');
    };

    return(
        <div>
            <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
                <script src="https://kit.fontawesome.com/a076d05399.js"></script>
            </head>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                <Navbar.Brand href="#">DEFECTPro Prediction System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/fileUploader">File Uploader</Nav.Link>
                    <Nav.Link href="/contactUs">Contact  Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <section clasName="py-4">
                <div className="container">
                    <div className="row py-4">
                        <div className="col-md-4 my-auto">
                            <h3 style={{ color: "white" }}>Contact Us</h3>
                        </div>
                    </div>   
                </div>
            </section>
            

            <section className="section">
                <div className="container">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Contact Form</h6>
                                    <hr />
                                    <div className="form-group">
                                        <label className = "mb-1">Full Name</label>
                                        <input id="fullname" type="text" className="form-control" placeholder="Enter Full Name"></input>
                                    </div>
                                    <div className="form-group">
                                        <label className = "mb-1">Phone Number</label>
                                        <input id="phoneNumber" type="text" className="form-control" placeholder="Enter Phone Number"></input>
                                        <div className="invalid-feedback">Please enter a valid phone number.</div>
                                    </div>
                                    <div className="form-group">
                                        <label className = "mb-1">Email Address</label>
                                        <input id="email" type="text" className="form-control" placeholder="Enter Email Address"></input>
                                        <div className="invalid-feedback">Please enter a valid email address.</div>
                                    </div>
                                    <div className="form-group">
                                        <label className = "mb-1">Message</label>
                                        <textarea id="message" rows="3" className="form-control" placeholder="Type your mesage..."></textarea>
                                    </div>
                                    <div className="form-group py-3">
                                        <button type = "button" className="btn btn-primary shadow w-100" onClick={handleSubmit}>Send Message</button>
                                    </div>
                                </div>
                                <div className="col-md-6 border-start">
                                    <h5 className="main-heading">Address Information</h5>
                                    <div className="underline"></div>
                                    <p>
                                        Informatics Institute of Technology, No 57, Ramakrishna Road, Colombo 6, Sri Lanka
                                    </p>
                                    <p>
                                        Phone: 0112 234 567 
                                    </p>

                                    <p>
                                        Email: dulini.2019785@iit.ac.lk
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>

             
            <footer className="bg-light text-center mt-5 p-1">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-12">
                        <ul className="list-inline">
                        <li className="list-inline-item"><p>&copy; 2023 Defect Prediction System</p></li>
                        <li className="list-inline-item">
                            <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebookF} /></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://www.linkedin.com"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </footer>

        </div>
        
        
    );
}

export default Contactus;