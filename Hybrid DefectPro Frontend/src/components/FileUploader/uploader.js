import { useState } from 'react';
import { toast } from 'react-toastify';
import './styles.css';
import { storage, rtDatabase } from '../../firebase';
import {
    ref as ref1,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { ref as ref2, set, onValue } from "firebase/database";
import { Navbar, Nav, Container } from 'react-bootstrap';

export const FileUploader = ({ }) => {

    const [file, setFile] = useState("");
    const [result, setresult] = useState("Welcome to the Software detection System................");
    const [percent, setPercent] = useState(0);
    

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ['application/zip', 'application/x-zip-compressed'];
            if (!allowedTypes.includes(selectedFile.type)) {
                toast.error("Please select a zip file!");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please upload your project as a zip file first!");
            return;
        }
        else {
            // Check if the selected file is a zip file
            const allowedTypes = ['application/zip', 'application/x-zip-compressed'];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Please select a zip file!");
                return;
            }

            const storageRef = ref1(storage, `/files/${file.name}`);

            // progress can be paused and resumed. It also exposes progress updates.
            // Receives the storage reference and the file to upload.
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setresult("Please wait until the project is uploaded: "+percent+" %");
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);

                        set(ref2(rtDatabase, "react/"), {
                            folderuri: url,
                            response: "",
                            filename:file.name,
                        });

                        const reslutref = ref2(rtDatabase, "react/");
                        onValue(reslutref, (snapshot) => {
                            const data = snapshot.val();
                            setresult(data);
                            if (data.response === "") {
                                setresult("Please wait until the ML server responds....");
                            }
                            else {
                                setresult("Software defect prediction is succesfull: "+ data.response);
                            }
                        });
                    });
                }
            );
        }
    };


    return (
        
        <div>
            <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
            </head>
             <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">DEFECTPro Prediction System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/fileUploader">File Uploader</Nav.Link>
                            <Nav.Link href="/contactUs">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
            <Container>
            <p></p>
            <div className="alert">
                <span className="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                <strong></strong> {result}
            </div>
                <div className="form-group files text-center">
                    <label>
                        <h2>Upload Your Angular Project Here</h2>{' '}
                    </label>
                    <br></br>
                    <div className="fileInput">
                        <label>
                            <h4>PLEASE upload a zip file</h4>{' '}
                        </label>
                        <input
                            type="file"
                            accept=".zip"
                            onChange={handleFileUpload}
                            className="form-control"
                        />
                    </div>
                    
                </div>
           
                <button className="btn btn-success mt-5" onClick={handleUpload}><b>Upload</b></button>
       
            </Container>
            </main>

        </div>
    );
};


export default FileUploader;