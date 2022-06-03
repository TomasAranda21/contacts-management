import { Formik } from 'formik'
import {useState} from 'react'
import { AlertInputs } from '../Alerts/AlertInputs'
import ButtonForm from '../Button/ButtonForm'
import Input from '../Inputs/Input'
import Spinner from '../Spinner/Spinner'
import './form.css'

const Form = ({onSubmitFunction, valuesName, valuesEmail, valuesTel, valuesId, edit, handleHiddenModal, saveOrEditModal, user}) => {

    const [spinner, setSpinner] = useState(false)


    const cancel = () => {

        handleHiddenModal()

        setTimeout(() => {

            window.location.reload()


        }, 500)
    }


  return (

        <Formik
        
            initialValues={{

                id: valuesId,
                name: valuesName,
                email: valuesEmail,
                tel: valuesTel,

            }}

            validate = { ({name, email, tel}) =>{
                const errors = {}

                if(!name){
                    errors.name = 'required'
                }
                if(!email){
                    errors.email = 'required'
                }
                if(!tel){
                    errors.tel = 'required'
                }

                return errors;

            }}

            onSubmit={async (values, {resetForm}) => {

                if(edit){
                    const {id,name, email, tel} = values

                    try {

                        setSpinner(true)
    
                        await onSubmitFunction(id, name, email, tel)


                        setSpinner(false)
                        
                        window.location.reload()


                    } catch (error) {
                        
                    console.log(error)
    
                    }

                }else{
                    const {name, email, tel} = values

                    try {

                        setSpinner(true)
        
                        await onSubmitFunction(name, email, tel, user.email)
        
                        setSpinner(false)
                        
                        resetForm()


                    } catch (error) {
                        
                    console.log(error)
    
                    }
                    
                }
                
                saveOrEditModal()

            }}
            >

                {({values, errors, touched, handleSubmit, handleChange}) => (

                <form action="" onSubmit={handleSubmit} className='form'>
                    
                    <div>
                        <Input
                        type='text'
                        name='name'
                        text='name'
                        placeholder='James Morgan'
                        onChange={handleChange}
                        value= {values.name}
                        touched={touched}
                        />
                        {errors.name && touched.name && <AlertInputs text={errors.name}/>}
                    </div>

                    <div>
                        <Input
                        type='email'
                        name='email'
                        text='email'
                        placeholder='JamesMorgan@mail.com'
                        onChange={handleChange}
                        value= {values.email}
                        touched={touched}

                        />
                        {errors.email && touched.email && <AlertInputs text={errors.email}/>}


                    </div>

                    <div>
                        <Input
                        type='tel'
                        name='tel'
                        text='Phone'
                        placeholder='+54 3512576069'
                        onChange={handleChange}
                        value= {values.tel}
                        touched={touched}

                        />

                        {errors.tel && touched.tel && <AlertInputs text={errors.tel}/>}


                    </div>

                    <div className='div_form_button'>

                        <ButtonForm type="submit" text={spinner ? <Spinner/> : edit ? 'Save' : 'Add'}/>

                        {<ButtonForm text='Cancel' onClick={() => cancel()} type="button"/>}
                        
                    </div>
                </form>

            )}


      </Formik>

  )
}

export default Form