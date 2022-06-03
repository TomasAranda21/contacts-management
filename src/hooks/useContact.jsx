import { useContext } from 'react'
import ContactContext from '../context/ContactProvider'


const useContact = () => {

  return useContext(ContactContext)
  
}

export default useContact