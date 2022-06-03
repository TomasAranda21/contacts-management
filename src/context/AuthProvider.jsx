import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword ,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} 
from "firebase/auth";


import { auth } from '../Firebase'


import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2/dist/sweetalert2.all.js';


const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})

    const [loading, setLoading ] = useState(true)

  

    useEffect(() => {

        onAuthStateChanged(auth, currentUser => {

            setUser(currentUser)

            setTimeout(() => {

                setLoading(false)

            }, 1000)

        })
        
    }, [])



    const createUser =  (name, email, password) =>  createUserWithEmailAndPassword(auth, name, email,  password)



    const singIn =  (email, password) =>  signInWithEmailAndPassword(auth, email,  password)



    const loginWithGoogle = () => {


        const googleAuthProvider = new GoogleAuthProvider()

        return signInWithPopup(auth, googleAuthProvider)
    }


    const resetPassword = (email) => sendPasswordResetEmail(auth, email)




    const logOut = () => {

        const MySwal = withReactContent(Swal)

        MySwal.fire({
            title: 'Are you sure you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
        
                setUser({})
                
                return
            }
          })
      
    }





    return (
        <AuthContext.Provider
        value={{
            createUser,
            singIn,
            logOut,
            loginWithGoogle,
            resetPassword,
            user,
            loading
        }}


        >
        
        {children}

        </AuthContext.Provider>
    )
}

export default AuthContext