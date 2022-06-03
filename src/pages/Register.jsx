import { Formik } from 'formik'
import {useState} from 'react'
import FormLoginRegister from '../components/Form/FormLoginRegister'
import {InputPassword, InputName, InputEmail} from '../components/Inputs/typeInputs/TypeInputs'
import useAuth from '../hooks/useAuth'
import { AlertInputs } from '../components/Alerts/AlertInputs'
import AlertFirebase from '../components/Alerts/AlertFirebase'
import { useNavigate } from 'react-router-dom'
import HeaderLoginReg from '../components/Header/HeaderLoginReg'

const Register = () => {

  const {createUser } = useAuth()
  const [alert, setAlert] = useState({})

  const navigate = useNavigate()



  return (
<>

  <HeaderLoginReg/>


    <Formik
    initialValues={{
      name: '',
      email: '',
      password: ''

    }}

    validate={({email,password, name}) => {
      const errors = {}

      if(!email){
        errors.email = 'required'
      }

      if(!password){
        errors.password = 'required'
      }

      if(!name){
        errors.name = 'required'
      }

      return errors

    }}

    onSubmit={async (values, {resetForm}) => {
      console.log(values)

      try {
        const {email, password, name} = values

        await createUser(email, password, name)

        setAlert({
          msg: "user created successfully",
          error: false
        })

        setTimeout(() => {

          navigate('/')

        }, 1000)
        
      } catch (error) {
        if(error.code === "auth/invalid-email"){
    
          setAlert({
              msg: "Email invalidate",
              error: true
          })
      }
      if(error.code === "auth/weak-password"){

          setAlert({
              msg: "Password should be at least 6 characters",
              error: true
          })
      }
      if(error.code === "auth/email-already-in-use"){

          setAlert({
              msg: "the email entered is already registered",
              error: true
          })
      }
      }


    }}

    >

        {({handleSubmit, handleChange, values, touched, errors}) => (

          <FormLoginRegister handleSubmit={handleSubmit} login={false}>

            {alert.msg && <AlertFirebase text={alert.msg} error={alert.error}/>}
              <div>
                <InputName 
                handleChange={handleChange}
                touched={touched}
                values= {values.name }
                />

                {errors.name && touched.name && <AlertInputs text={errors.name}/>}

              </div>

              <div>
                <InputEmail 
                handleChange={handleChange}
                touched={touched}
                values= {values.email}
                />
                {errors.email && touched.email && <AlertInputs text={errors.email}/>}

              </div>

              <div>
                <InputPassword 
                handleChange={handleChange}
                touched={touched}
                value= {values.password}
                />

                {errors.password && touched.password && <AlertInputs text={errors.password}/>}

              </div>



          </FormLoginRegister>

        )}

    </Formik>

</>




  )
}

export default Register