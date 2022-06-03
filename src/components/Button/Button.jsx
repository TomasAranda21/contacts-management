import React from 'react'
import './button.css'

const Button = ({text, type, onClick, text2}) => {
  return (
    <button type={type} onClick={onClick} className='button_principal'>{text} {text2}</button>
  )
}

export default Button