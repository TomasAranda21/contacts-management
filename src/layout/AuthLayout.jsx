import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import Header from '../components/Header/Header'
import useAuth from '../hooks/useAuth'
import PageSpinnerLoading from '../components/Spinner/PageSpinnerLoading'



const AuthLayout = () => {

  const {user ,loading } = useAuth()
  
  if (loading) 
  
  { return (
  
    <PageSpinnerLoading/>
  
  )}

  return (
    <div>

      {user?.email ? (
      
       <> 
      
      <Header />

        <Outlet/>
      
      </>) : <Navigate to="/user"/>}


    </div>
  )
}

export default AuthLayout