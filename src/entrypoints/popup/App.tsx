import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Home from '@/entrypoints/popup/components/Home';
import Login from '@/entrypoints/popup/components/Login';
import Signup from '@/entrypoints/popup/components/Signup';
import Forgot from '@/entrypoints/popup/components/Forgot';
import EditUser from '@/entrypoints/popup/components/EditUser';
import PrivateRoute from './components/ui/PrivateRoute';
import ResendCode from './components/ResendCode';


function App() {
  const { auth } = useAuth();

  return (
    <HashRouter>
      <Routes>
        {<Route path="/" element={<Navigate to={auth ? "/home" : "/login"} />} />}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/edit" element={<PrivateRoute><EditUser /></PrivateRoute>} />
        <Route path="/login" element={!auth ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!auth ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path='/resend-code' element={<ResendCode />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
