import { Formik } from 'formik'
import React, { useState } from 'react'
import FormLoginRegister from '../components/Form/FormLoginRegister'
import {InputEmail} from '../components/Inputs/typeInputs/TypeInputs'
import useAuth from '../hooks/useAuth'
import { AlertInputs } from '../components/Alerts/AlertInputs'
import AlertFirebase from '../components/Alerts/AlertFirebase'


const ForgotPassword = () => {

  const {resetPassword } = useAuth()
  const [alert, setAlert] = useState({})

  return (
    <>
    
        <Formik
        initialValues={{
          email: '',
          password: ''
    
        }}
    
        validate={({email,password}) => {
          const errors = {}
    
          if(!email){
            errors.email = 'required'
          }
    
          return errors
    
        }}
    
        onSubmit={async (values, {resetForm}) => {
          console.log(values)
    
          try {
            const {email} = values
    
            await resetPassword(email)

            setAlert({
              msg: " we send you an email with a link to reset your password, please check your spam folder.",
              error: false
  
            })
    
            resetForm()
    
            
          } catch (error) {
    
            if(error.code === 'auth/user-not-found') {
              setAlert({
                msg: "the email was not registered",
                error: true
    
              })
    
              return
    
            }
    
          }
    
        }}
    
        >
    
            {({handleSubmit, handleChange, values, touched, errors}) => (
    
              <FormLoginRegister handleSubmit={handleSubmit} pass={true}>
                
                {alert.msg && <AlertFirebase text={alert.msg} error={alert.error}/>}
                
                <div>
                  <InputEmail 
                    handleChange={handleChange}
                    values= {values.email}
                    touched={touched}
    
                  />
    
                  {errors.email && touched.email && <AlertInputs text={errors.email}/>}
    
                </div>
    
    
                  
              </FormLoginRegister>
    
            )}
    
        </Formik>
    
    </>
    
    
    
    
      )
}

export default ForgotPassword