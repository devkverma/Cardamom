import {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Button from './Button'
import { AuthContext } from '../AuthProvider'

const Header = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsLoggedIn(false)
        navigate('/login')
    }

  return (
    <>
        <nav className='navbar container pt-3 pb-3 align-items-start'>
            <Link className='navbar-brand text-light fs-1' to="/">Cardamom</Link>

            <div>
              {isLoggedIn ? (
                <>
                  <Button text='Dashboard' style='' url='/dashboard'/>
                  &nbsp;
                  <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
                </>
                  
              ) : (
                  <>
                  <Button text='Login' style='' url="/login"/>
                  &nbsp;
                  <Button text='Register' style=''  url="/register"/>
                  </>
              )}
                
            </div>
            
        </nav>
    </>
  )
}

export default Header