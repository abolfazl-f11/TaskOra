import LoginPage from './Authentication/Login/LoginPage.jsx';
import ForgotPass from './Authentication/Forgot/ForgotPass.jsx';
import SignUpPage from './Authentication/SignUp/SignUpPage.jsx';
import SignUpVerification from './Authentication/SignUp/SignUpVerification.jsx';
import HomePage from './Authentication/Home/HomePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/login/forgot-password' element={<ForgotPass />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signup/verification' element={<SignUpVerification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

};

export default App;