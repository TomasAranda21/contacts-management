import { Formik } from 'formik'
import React, { useState } from 'react'
import FormLoginRegister from '../components/Form/FormLoginRegister'
import {InputPassword, InputName, InputEmail} from '../components/Inputs/typeInputs/TypeInputs'

import useAuth from '../hooks/useAuth'
import {useNavigate } from 'react-router-dom'
import { AlertInputs } from '../components/Alerts/AlertInputs'
import AlertFirebase from '../components/Alerts/AlertFirebase'
import HeaderLoginReg from '../components/Header/HeaderLoginReg'

const Login = () => {

  const {singIn } = useAuth()
  const [alert, setAlert] = useState({})

  const navigate = useNavigate()



  return (
<>
    <HeaderLoginReg/>

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

      if(!password){
        errors.password = 'required'
      }

      return errors

    }}

    onSubmit={async (values, {resetForm}) => {

      try {
        const {email, password} = values

        await singIn(email, password)

        navigate('/')

        
      } catch (error) {

        if(error.code === 'auth/user-not-found') {
          setAlert({
            msg: "The user dont exist",
            error: true

          })

          return

      }

        if(error.code === 'auth/wrong-password'){
          setAlert({
            msg: "The password is incorrect",
            error: true
          })

          return

        }
      }


    }}

    >

        {({handleSubmit, handleChange, values, touched, errors}) => (

          <FormLoginRegister handleSubmit={handleSubmit} login={true}>
            
            {alert.msg && <AlertFirebase text={alert.msg} error={alert.error}/>}
            
            <div>
              <InputEmail 
                handleChange={handleChange}
                values= {values.email}
                touched={touched}

              />

              {errors.email && touched.email && <AlertInputs text={errors.email}/>}

            </div>


              <div>
                <InputPassword 
                  handleChange={handleChange}
                  value= {values.password}
                  touched={touched}

                />

                {errors.password && touched.password && <AlertInputs text={errors.password}/>}

              </div>


          </FormLoginRegister>

        )}

    </Formik>

</>




  )
}

export default Login