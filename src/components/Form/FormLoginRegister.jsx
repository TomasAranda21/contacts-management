import React from 'react'
import './form.css'
import ButtonForm from '../Button/ButtonForm'
import google from '../../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Login from '../../assets/userManagement.svg'

const FormLoginRegister = ({handleSubmit, children, login, pass}) => {

  const {loginWithGoogle} = useAuth()

  const navigate = useNavigate()

  const handleLoginGoogle = async () => {
    
    try {
      
      await loginWithGoogle()
      navigate('/')

    } catch (error) {
      
      console.log(error)
    }

  }

  return (
    <>
    
    <div className="div_container_all_form">
      <div className={!pass ? `container_img_title` : 'container_img_title_password'}>

        <h1>{!pass ? !login ? 'register and start managing your contacts' : 'log in to manage your contacts' : "recover your password and do not lose access to your account"}</h1>

        <img src={Login} alt="" width={350} />

      </div>

      <div className="container_form_login_register">
          <form action="" onSubmit={handleSubmit} className="form_login_register">

              <div className="div_form_container">

              <h1 className="title_form">{!pass ? !login ? 'register' : 'log in ' : "recover your password"}</h1>


                {children}
                {login && <Link to="/user/forgot-password" className=" p_form_password_Link">Forgot your password?</Link>}

                <ButtonForm text = {!pass ? !login ? 'Signup' : 'Sign in' : "send instructions"} type = 'submit'/>

                
                {!pass &&
                
                    <button onClick={() => handleLoginGoogle()} type="button" className="button_login_google">
                    <img src={google} alt="" width="30"/>
                      Sign in with google
                    </button> 
                  
                }


                {login && !pass ? 
                


                (<p className="p_form_LRP">Don't have an account <Link to='/user/register' className="p_form_LRP_Link ">Create one now</Link></p>) 
                
                : 

                (<p className="p_form_LRP">You have an account? <Link to='/user' className="p_form_LRP_Link ">Login now</Link></p>)}

            
              </div>


          </form>
      </div>
    </div>
    </>
  


      
  )
}

export default FormLoginRegister