import { useEffect, useRef, useState } from 'react'
import useContact from '../hooks/useContact'
import Table from '../components/TableContact/Table'
import Form from '../components/Form/Form'
import './pages.css'
import useAuth from '../hooks/useAuth'
import Button from '../components/Button/Button'
import { FaUserPlus} from 'react-icons/fa'
import Pagination from '../components/Pagination/Pagination'

const Home = () => {

  const {addContact, contact, deleteContact, editContact, editing, stateEditing} = useContact()
  
  const {user} = useAuth()
  
  const [isOpen, seIsOpen] = useState(false)
  const [contactEdit, setcontactEdit] = useState({})
  
  
  const refModal = useRef()
  const refModalEdit = useRef()

  const html = document.querySelector('html')


  useEffect(() => {
    if (isOpen) {

    html.classList = 'no-scroll'
    

    }else{
        
        html.classList = ''

    }

  }, [isOpen])


  useEffect(() => {

    if(editing?.name){

      setcontactEdit({
  
        name: editing.name,
        email: editing.email,
        tel: editing.tel,
        id: editing.id ,
  
      })
    }


  }, [editing])
  


  const handleHiddenModal = () => {


    refModal.current.className = 'hidden_modal_form'
    refModalEdit.current.className = 'hidden_modal_form'

    seIsOpen(false)

 }

 const saveOrEditModal = () => {

    refModal.current.className = 'hidden_modal_form'
    refModalEdit.current.className = 'hidden_modal_form'
    seIsOpen(false)

 }


 const handleViewModal = () => {

  refModal.current.classList.remove('hidden_modal_form')
  refModal.current.classList.add('modal_form')

  seIsOpen(true)

 }


 const handleViewModalEdit = () => {

  if(refModal.current.classList !== undefined || refModal.current.classList !== null) {

    refModalEdit.current.classList.remove('hidden_modal_form')
    refModalEdit.current.classList.add('modal_form_edit')

    seIsOpen(true)


    return
  }

 }



  return (


    <div className="container_body">

      <h1>Manage your contacts</h1>

      <div className="div_button_add">

        {<Button text2={<FaUserPlus/>} text="Add New Contact" onClick={() => handleViewModal()}/>}

      </div>


    <div  ref={refModal} className="hidden_modal_form">
      <Form
          onSubmitFunction = {addContact}
          valuesName= {''}
          valuesEmail= {''}
          valuesTel= {''}
          edit = {false}
          handleHiddenModal ={handleHiddenModal}
          saveOrEditModal={saveOrEditModal}
          user={user}

        />

    </div>

      <div className="">
          <Table contact={contact} 
          user={user} 
          edit={stateEditing} 
          deleteContact={deleteContact} 
          handleViewModalEdit={handleViewModalEdit}
          
          />

      </div>



        <div ref={refModalEdit} className="hidden_modal_form">

            {contactEdit?.id ? 

      
             ( <Form
                onSubmitFunction = {editContact}
                valuesName= {contactEdit.name}
                valuesEmail= {contactEdit.email }
                valuesTel= {contactEdit.tel }
                valuesId = {contactEdit.id }
                edit = {true}
                handleHiddenModal ={handleHiddenModal}
                saveOrEditModal={saveOrEditModal}

              />
              
              ): null}
              
          </div>

    </div>
  )
}

export default Home