import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./homePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import paper from '../../images/paper.png'
import acceptance from '../../images/acceptance.png'

function HomePage() {
  return (
    <div className="App">
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
              <Nav.Link href="#documentation">Documents</Nav.Link>
              <Nav.Link href="/contactUs">Contact  Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
      <Container>
      <h1 className="mt-5 text-center">Welcome to the DEFECTPro Prediction System</h1>
        
        <section id="about" className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h3 className="main-heading">About Us</h3>
                <div className="underline mx-auto"></div>
                <p>
                  Welcome to DefectPro, a powerful software defect prediction system designed to help you identify and prevent defects in your software applications. With DefectPro, you can leverage machine learning algorithms and statistical models to analyze your code and predict potential defects before they occur. Our intuitive and user-friendly interface provides you with detailed insights and reports, enabling you to make informed decisions and take proactive measures to improve the quality of your software. Whether you are a software developer, tester, or project manager, DefectPro is the perfect solution to streamline your defect management process and enhance the overall quality of your software applications. Get started with DefectPro today and experience the benefits of our cutting-edge technology.
                </p>

              </div>
            </div>
          </div>

        </section>
        
         <div className="text-center">
            <a href="/fileUploader" className="btn btn-info mt-5"><b>Get Started</b></a>
        </div>
       </Container>


       <section id="documentation" className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h3 className="main-heading">Published Papers</h3>
                <div className="underline mx-auto"></div>

                <p>
                  Papers that are Published to the Conferences.
                </p>

                <div class="card-deck">
                  <div class="card">
                  <img src={paper} class="card-img-top" alt="paper"/>
                  </div>
                  <div class="card">
                  <img src={acceptance} class="card-img-top" alt="acceptance"/>
                  </div>
                  
                </div>

              </div>
            </div>
          </div>

        </section>
      </main>
      
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

export default HomePage;
