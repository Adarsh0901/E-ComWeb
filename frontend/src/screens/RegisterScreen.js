import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import FormContainer from '../components/formContainer' 
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
  
    const dispatch = useDispatch()
  
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister
  
    const redirect = location.search ? location.search.split('=')[1] : '/'
  
    useEffect(() => {
      if (userInfo) {
        history.push(redirect)
      }
    }, [history, userInfo, redirect])
  
    const submitHandler = (e) => {
      e.preventDefault()
      if(password !== confirmPassword){
        setMessage('Password do not Match')
      }else{
        dispatch(register(name,email,gender,password))
      }
      
    }

    return (
        <FormContainer>
            <center><h1>Sign Up</h1></center>
            {message && <Message varient='danger'>{message}</Message>}
            {error && <Message varient='danger'>{error}</Message>}
            {loading && <Loader/>}
            <form onSubmit={submitHandler}>
                <div className="form-group" id='name'>
                    <label className="form-label">Name</label>
                    <input type="name" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group" id='email'>
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group" id='gender'>
                    <label as="legend" className="form-label">Gender</label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" label="Male" name="gender" id="male" value="male" checked onChange={(e) => setGender(e.target.value)}/>
                      <label className="form-check-label">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" label="Female" name="gender" id="female" value="female" onChange={(e) => setGender(e.target.value)}/>
                      <label className="form-check-label">
                        Female
                      </label>
                    </div>
                </div>
                <div className="form-group py-2" id='password'>
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group py-2" id='confirmpassword'>
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="d-grid gap-2 py-2">
                    <button className="btn btn-dark" type='submit' varient='primary'>Register</button>
                </div>
            </form>
            <div className="py-2">
                Have Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </div>
        </FormContainer>
    )
}

export default RegisterScreen
