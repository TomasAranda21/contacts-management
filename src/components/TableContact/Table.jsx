import React, {useEffect, useState} from 'react'
import { FaUserEdit, FaUserTimes } from 'react-icons/fa'
import contacts from '../../assets/contacts.png'
import Pagination from '../Pagination/Pagination'
import './table.css'

const Table = ({contact, edit, deleteContact, handleViewModalEdit, user }) => {

    const [userContact, setUserContact] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [contactPerPage] = useState(4)



    useEffect(() => {
        
        const filterUserContact = () => {

            const el = contact?.filter(e => e.userEmail === user.email);
          
            return setUserContact(el)

        }

        filterUserContact()    

        
    }, [contact])


    const handleEdit = (cont) => {

        handleViewModalEdit()
        
        edit(cont)
    }
    

 //  ==== Pagination ====

    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    const indexOfLastContact = currentPage * contactPerPage
    const indexOfFirstContact = indexOfLastContact - contactPerPage
    const currentContact = userContact?.slice(indexOfFirstContact, indexOfLastContact)

    

  return (

    <>
        {userContact?.length > 0 ?
        
        <div className="">

            <table className="table_contact">
                <tbody >
                        <tr className="table_contact_items">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th> 
                            <th></th> 
                        </tr>
                    
                        {currentContact?.map(cont => (
                                
                            <tr key={cont.id} className="table_contact_data_contact ">

                            <td>{cont.name}</td>
                            <td><p className=" ">{cont.email}</p></td>
                            <td>{cont.tel}</td>


                            <td className="div_contain_buttons">
                                <button className="btn_edit" onClick={() => handleEdit(cont)}><FaUserEdit/></button>
                                <button className="btn_delete" onClick={() => deleteContact(cont.id)}><FaUserTimes/></button>
                            </td>

                            </tr>

                        ))}

                </tbody>
            </table>

            <Pagination contactPerPage={contactPerPage} totalContact={userContact?.length} paginate={paginate}/>
            
        </div>
        :
        
        <div className='div_no_contacts'>
            <img src={contacts} alt="" width="250"/>
            <h2> start by adding your first contacts </h2>
        </div>
        }
    </>

  )
}

export default Table