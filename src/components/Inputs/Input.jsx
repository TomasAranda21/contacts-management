import React from 'react'
import './input.css'

const Input = ({type, name, text, placeholder, onChange, value, touched}) => {
  return (
    <>
        <div className="div_input_label">

            <label htmlFor={name} className="label">{text}</label>
            <input 
            type={type} 
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            touched={touched}
            className="input"
            />
        </div>
    
    </>
  )
}

export default Input