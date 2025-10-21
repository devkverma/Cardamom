import { CiUser, CiLock  } from "react-icons/ci";
import { useContext, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from "../AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Crowd from "./Crowd";

const Login = () => {

  const baseURL = import.meta.env.VITE_BACKEND_BASE_API 
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(true)

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const changeHidden = (e) => {
    setHidden(!hidden)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${baseURL}token/`, user)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      setError('')
      setIsLoggedIn(true)
      navigate('/dashboard')
    } catch (error) {
      setIsLoggedIn(false)
      setError('Incorrect Username or/and Password')
    } finally {
      setLoading(false)
    }
    
  }

  return (
    <>
        <div className="platform shadow rounded">
          <Crowd isHidden={hidden} />
          <form className="form shadow" onSubmit={handleLogin}>
            <h2 className="text-white-heading mb-5 mt-5">Login</h2>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <CiUser/>
                  </span>
                </div>
                <input type="text"  className="form-control" name="username" placeholder="Username" aria-label="Username" onChange={handleChange} aria-describedby="basic-addon1" ></input>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <CiLock/>
                  </span>
                </div>
                <input type={hidden ? "password" : "text"} className="form-control" name="password" placeholder="password" onChange={handleChange} aria-label="password" aria-describedby="basic-addon1"></input>
                <span className="input-group-text eye">
                  <i className={`bi ${hidden ? "bi-eye-slash" : "bi-eye"}`} onClick={changeHidden}></i>
                </span>
            </div>
            {error && <span className="text-danger">{error}</span>}
            { loading ?  (
                            <button type='submit' className='btn btn-info d-block mx-auto mt-4' disabled><FontAwesomeIcon icon={faSpinner} spin/></button>
                        ) :
                        (
                            <button type='submit' className='btn btn-info d-block mx-auto mt-4'>Login</button>
                        )}
          </form>
        </div>
    </>
  )
}

export default Login