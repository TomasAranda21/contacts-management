import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import UserLayout from './layout/UserLayout'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {ContactProvider} from './context/ContactProvider'
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <BrowserRouter>
    
    <AuthProvider>
        <ContactProvider>

          <Routes>

            <Route path='/user' element={<UserLayout/>}>
              <Route index element={<Login/>} />
              <Route path='register' element={<Register/>} />
              <Route path='forgot-password' element={<ForgotPassword/>} />
            </Route>


            <Route  path='/' element={<AuthLayout/>}> 
            
              <Route index element={<Home/>} />

            </Route>


          </Routes>

      </ContactProvider>
    </AuthProvider>

    </BrowserRouter>
  )
}

export default App
