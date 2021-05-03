import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/formContainer'

const UpdateUserScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
  
    const dispatch = useDispatch()
  
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile
  
  
    useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      }else{
        if(success){  
          dispatch(getUserDetails('profile'))
          history.push('/profile')  
        }else{
            setName(user.name)
            setEmail(user.email)
        }
      }
    }, [dispatch,history, userInfo, user, success])
  
    const submitHandler = (e) => {
      e.preventDefault()
      if(password !== confirmPassword){
        setMessage('Password do not Match')
      }else{
        dispatch(updateUserProfile({id:user._id, name , email ,gender, password}))
      }
    }

    return (
    <FormContainer>
        <div className="container">
            <center><h2>User Profile</h2></center>
            {message && <Message varient='danger'>{message}</Message>}
            {error && <Message varient='danger'>{error}</Message>}
            {success && <Message varient='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <form onSubmit={submitHandler}>
                <div className="form-group" id='name'>
                    <label className="form-label">Name</label>
                    <input type="name" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group py-1" id='email'>
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group" id='gender'>
                    <label className="form-label">Gender</label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" label="Male" name="gender" id="male" value="male" onChange={(e) => setGender(e.target.value)}/>
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
                <div className="form-group py-1" id='password'>
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group py-1" id='confirmpassword'>
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="d-grid gap-2 py-1">
                    <button className="btn btn-dark" type='submit' varient='primary'>Update</button>
                </div>
            </form>
        </div>
      </FormContainer>

    
    )
}

export default UpdateUserScreen
