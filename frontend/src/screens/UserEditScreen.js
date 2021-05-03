import React, {useState, useEffect} from 'react'
import PhoneInput from  'react-phone-number-input'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import FormContainer from '../components/formContainer' 
import { getUserDetails, updateUsers } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate
  
  
    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setGender(user.gender)
                setPhoneNumber(user.phoneNumber)
                setIsAdmin(user.isAdmin)
            }
        }
    },[user,userId,dispatch,history, successUpdate])
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateUsers({_id: userId,name,email,phoneNumber,gender,isAdmin}))
    }

    return (
        <FormContainer>
            <center><h1>EDIT USER</h1></center> 
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message >{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message varient='danger'>{error}</Message> : (
                <form onSubmit={submitHandler}>
                    <div className="form-group" id='name'>
                        <label className="form-label">Name</label>
                        <input type="name" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group py-2" id='email'>
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="my-2"><PhoneInput placeholder="Enter Phone Number" value={phoneNumber} onChange={setPhoneNumber}/></div>
                    <div className="form-group" id='gender'>
                        <label as="legend" className="form-label">Gender</label>
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
                    <div className="form-check py-2">
                        <input className="form-check-input" type="checkbox" id="isadmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}/>
                        <label className="form-check-label">
                            Is Admin
                        </label>
                    </div>
                    <div className="d-grid gap-2 py-2">
                        <button className="btn btn-dark" type='submit' varient='primary'>Update</button>
                    </div>
                </form>
            )}
        </FormContainer>
    )
}

export default UserEditScreen
