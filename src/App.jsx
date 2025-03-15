import LoginPage from './Authentication/Login/LoginPage.jsx';
import SignUpPage from './Authentication/SignUp/SignUpPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );

};

export default App;