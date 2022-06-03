import useAuth from '../../hooks/useAuth'
import './header.css'

const Header = () => {

  const { logOut} = useAuth()

  return (
    <header>
        <nav className="header_nav">
            <h1>U/M</h1>

            <button onClick={() => logOut()}>Log Out</button>
        </nav>
    </header>
  )
}

export default Header