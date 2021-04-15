import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {listOrders} from '../actions/orderActions'

const OrderListScreen = ({history}) => {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }
    },[dispatch,history,userInfo])

    return (
        <>
            <h1>ORDERS</h1>
            {loading ? <Loader/> : error ? <Message>{error}</Message>: (
                <table className="table table-responsive table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERD</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>$ {order.totalPrice}</td>
                                <td>{order.isPaid?  order.paidAt.substring(0,10) : (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                <td>{order.isDelivered?  order.deliveredAt.substring(0,10) : (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <Link to={`/order/${order._id}`}><button className="btn btn-outline-info">Detail</button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default OrderListScreen
