import { CiUser, CiLock  } from "react-icons/ci";
import { useContext, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from "../AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Crowd from "./Crowd";

const Register = () => {
 const baseURL = import.meta.env.VITE_BACKEND_BASE_API 
  const [user, setUser] = useState({
        "first_name" : '',
        "last_name" : '',
        "username" : '',
        "email" : '',
        "password" : '',
        "confirm_password" : '',
  })

  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(true)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const changeHidden = (e) => {
    setHidden(!hidden)
  }

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${baseURL}register/`, user)
      setError('')
      setSuccess(true)
      navigate('/login')
    } catch (error) {
      console.log(error)
      setError(error.response.data.error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
    
  }

  return (
    <>
        <div className="platform shadow rounded">
          <Crowd isHidden={hidden} />
          <form className="form shadow" onSubmit={handleRegistration}>
            <h2 className="text-white-heading mb-4 mt-4">Register</h2>
            {/* username */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <CiUser/>
                  </span>
                </div>
                <input type="text"  className="form-control" name="username" value={user.username} placeholder="Username" aria-label="username" onChange={handleChange} aria-describedby="basic-addon1" ></input>
            </div>
            {/* firstname */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    Ā
                  </span>
                </div>
                <input type="text"  className="form-control" name="first_name" value={user.first_name} placeholder="First Name" aria-label="firstname" onChange={handleChange} aria-describedby="basic-addon1" ></input>
            </div>
            {/* last name */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    Ƀ
                  </span>
                </div>
                <input type="text"  className="form-control" name="last_name" value={user.last_name} placeholder="Last Name" aria-label="lastname" onChange={handleChange} aria-describedby="basic-addon1" ></input>
            </div>
            {/* email */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    @
                  </span>
                </div>
                <input type="email"  className="form-control" name="email" value={user.email} placeholder="Email" aria-label="email" onChange={handleChange} aria-describedby="basic-addon1" ></input>
            </div>
            {/* password */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <CiLock/>
                  </span>
                </div>
                <input type={hidden ? "password" : "text"} className="form-control" value={user.password} name="password" placeholder="Password" onChange={handleChange} aria-label="password" aria-describedby="basic-addon1"></input>
                <span className="input-group-text eye">
                  <i className={`bi ${hidden ? "bi-eye-slash" : "bi-eye"}`} onClick={changeHidden}></i>
                </span>
            </div>
            {/* confirm password */}
            <div className="input-group mb-0">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <CiLock/>
                  </span>
                </div>
                <input type={hidden ? "password" : "text"} className="form-control" value={user.confirm_password} name="confirm_password" placeholder="Confirm Password" onChange={handleChange} aria-label="confirm-password" aria-describedby="basic-addon1"></input>
                <span className="input-group-text eye">
                  <i className={`bi ${hidden ? "bi-eye-slash" : "bi-eye"}`} onClick={changeHidden}></i>
                </span>
            </div>
            {/* success message */}
            {success && <div className='alert alert-success'>Registration Successful</div>}
            {/* error message */}
            {error && <span className="text-danger mb-0 mt-0.5">{error}</span>}
            { loading ?  (
                            <button type='submit' className='btn btn-info d-block mx-auto mt-4' disabled><FontAwesomeIcon icon={faSpinner} spin/></button>
                        ) :
                        (
                            <button type='submit' className='btn btn-info d-block mx-auto mt-4'>Register</button>
                        )}
          </form>
        </div>
    </>
  )
}

export default Register