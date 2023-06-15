import HomePage from './components/Home/homePage';
import { FileUploader } from './components/FileUploader/uploader';
import Contactus from './components/ContactUs/contactUs';
import {ToastContainer} from 'react-toastify';
import { Routes, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/fileUploader' element={<FileUploader/>}></Route>
          <Route path='/contactUs' element={<Contactus/>}></Route>
        </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;

