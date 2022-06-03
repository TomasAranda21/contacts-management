import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc,onSnapshot, connectFirestoreEmulator  } from "firebase/firestore";
import {db} from '../Firebase'

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const ContactContext = createContext()

export const ContactProvider = ({ children }) => {

    const [contact, setContact] = useState(null)
    const [editing, setEditing] = useState({})

    const MySwal = withReactContent(Swal)



    useEffect(() => {

        const getContact = onSnapshot(
            collection(db, "user-contacts"),
            (snapShot) => {
              let list = [];
              snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
              });
                setContact(list);


            },
            (error) => {
              console.log(error);
            }
          );
      
          return () => {

            getContact();

          };


    }, [])

    

    // Add a new document with a generated id.
    const addContact = async (name, email, tel, userEmail) => {

        await addDoc(collection(db, "user-contacts"), {
            userEmail,
            name,
            email,
            tel
        });


          await MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The contact was added successfully',
            showConfirmButton: false,
            timer: 1500
          })


    }

    const stateEditing = (data) => {

        return setEditing(data)
    }


    

    const editContact = async (id, name, email, tel) => {

        const contactRef = doc(db, "user-contacts", id);

        try {
          await updateDoc(contactRef, {
              name,
              email,
              tel
          });

            

          await MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contact edited successfully',
            showConfirmButton: false,
            timer: 1500
          })


          
        } catch (error) {
          
          console.log(error)
        }

    }



    const deleteContact = async (id) => {



      MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          
          try {
            await deleteDoc(doc(db, 'user-contacts', id));

            setContact(contact.filter(item => item.id !== id))
            
          } catch (error) {
            
            console.log(error)
            
          }
        }
      })
    }

  return (
    <ContactContext.Provider
    value={{
        addContact,
        deleteContact,
        editContact,
        stateEditing,
        editing,
        contact,
    }}
    >
        
        {children}
        
    </ContactContext.Provider>
  )
}

export default ContactContext