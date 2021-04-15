import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import FormContainer from '../components/formContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const dispatch = useDispatch()
  
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
  
    const redirect = location.search ? location.search.split('=')[1] : '/'
  
    useEffect(() => {
      if (userInfo) {
        history.push(redirect)
      }
    }, [history, userInfo, redirect])
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <center><h1>Sign In</h1></center>
            {error && <Message varient='danger'>{error}</Message>}
            {loading && <Loader/>}
            <form onSubmit={submitHandler}>
                <div className="form-group" id='email'>
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group py-2" id='password'>
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-grid gap-2 py-2">
                <button className="btn btn-dark" type='submit' varient='primary'>Sign In</button>
                </div>
            </form>
            <div className="py-2">
                New User? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </div>
        </FormContainer>
    )
}

export default LoginScreen
