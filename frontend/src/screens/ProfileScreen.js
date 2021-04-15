import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
  
    const dispatch = useDispatch()
  
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading:loadingOrders, error: errorOrders, orders } = orderListMy
  
  
    useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      }else{
          if(!user.name || success){
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
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
        dispatch(updateUserProfile({id:user._id, name , email , password}))
      }
      
    }

    return (
    <div className="row">
        <div className="col-md-3">
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
        <div className="col-md-9">
            <h2>My Orders</h2>
            {loadingOrders ? <Loader/> : errorOrders ? <Message>{errorOrders}</Message> :orders.length !== 0? (
              <>
                {orders.map((order) => (
                  <div className="py-2" key={order._id}>
                  <div className="card">
                  <div className="card-header">
                    <table className="table table-borderless table-responsive table-sm">
                      <thead>
                        <tr>
                          <th>Order Id: </th>
                          <th>Created At: </th>
                          <th>Total Price: </th>
                          <th> Paid </th>
                          <th> Delivered </th>
                          <th>Detail </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{order._id}</th>
                          <th>{order.createdAt.substring(0,10)}</th>
                          <th>{order.totalPrice}</th>
                          <th>{order.paidAt ? order.paidAt.substring(0,10) : <i className="fas fa-times" style={{color: 'red'}}></i>}</th>
                          <th>{order.deliveredAt ? order.deliveredAt.substring(0,10): <i className="fas fa-times" style={{color: 'red'}}></i>}</th>
                          <th><Link to={`/order/${order._id}`}><button className="btn btn-outline-info">Detail</button></Link></th>
                        </tr>
                      </tbody>
                    </table>
                    
                  </div>
                  <div className="card-body border-light">
                    <h5 className="card-title">Order Content:</h5>
                    {order.orderItems.map((items) => (
                      <div className="card mb-3" key={items._id} style={{width: '60%'}}>
                        <div className="row g-0">
                          <div className="col-md-3">
                            <img src={items.image} className="img-fluid" alt="..."/>
                          </div>
                          <div className="col-md-9">
                            <div className="card-body">
                              <h6 className="card-title">{items.name}</h6>
                              <h6 >$ {items.price}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                  </div>
                  </div>
                  </div>
                ))}
              </>
            ) : (<h1>:( Sorry... it's seems your order list is empty</h1>)}
        </div>
        </div>

    
    )
}

export default ProfileScreen
