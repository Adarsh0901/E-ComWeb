import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Message from '../components/message'
import Loader from '../components/loader'
import { getUserDetails } from '../actions/userActions'
import FormContainer from '../components/formContainer'

const ProfileScreen = ({ location, history }) => {
  
    const dispatch = useDispatch()
  
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
  
    useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      }else{
        if(!user.name){
        dispatch(getUserDetails('profile'))
      }
      }
    }, [dispatch,history, userInfo, user])


    return (
      <FormContainer>
      <div>
        {error && <Message varient='danger'>{error}</Message>}
        {loading && <Loader/>}
        <div className="card text-center">
          <div className="card-header">
            USER DETAIL
          </div>
          <div className="text-center my-3">
            <img src="/images/avatar.jpeg" className="img-fluid rounded" alt="avatar" style={{height:'100px', width:'100px'}} />
          </div>
          <div className="card-body">
            <h2 className="card-title">Name: {user.name}</h2>
            <h5 className="card-text">Email: {user.email}</h5>
            <h5 className="card-text">Phone: phonenohere</h5>
            <h6 className="card-text text-muted">Created At: {user.createdAt}</h6>
            <Link to="/update-user" className="btn btn-primary my-2">Update profile</Link>
          </div>
          <div className="card-footer text-muted">
            last Updated At: {user.updatedAt}
          </div>
        </div>
      </div>
      </FormContainer>
    )
}

export default ProfileScreen
