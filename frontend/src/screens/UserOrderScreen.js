import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { listMyOrders } from '../actions/orderActions'

const UserOrderScreen = ({ history}) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading:loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
          history.push('/login')
        }else{
            dispatch(listMyOrders())
        }
    }, [dispatch,history, userInfo])

    return (
        <div>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader/> : errorOrders ? <Message>{errorOrders}</Message> :orders.length !== 0? (
              <>
                {orders.map((order) => (
                  <div className="py-2" key={order._id}>
                  <div className="card">
                  <div className="card-header">
                  <div className="table-responsive">
                    <table className="table table-borderless table-sm">
                      
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
    )
}

export default UserOrderScreen
