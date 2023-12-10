import './App.css'
import {Routes, Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { useEffect } from 'react';

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

function App() {
  
  return (
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element= {<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
      
    
  )
}

export default App
