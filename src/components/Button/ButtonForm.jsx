import './button.css'


const ButtonForm = ({text, type, onClick}) => {

    return (

        <button type={type} onClick={onClick} className='button_form '>{text}</button>

    )
}

export default ButtonForm