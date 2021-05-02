import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {getOrderDetails, deliveredOrder, paidOrder} from '../actions/orderActions'
import { ORDER_DELIVERED_RESET , ORDER_PAID_RESET} from '../constants/orderConstants'

const OrderScreen = ({match, history}) => {

    const orderId = match.params.id

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderDelivered = useSelector(state => state.orderDelivered)
    const {loading: loadingDelivered, error: errorDelivered, success: successDelivered } = orderDelivered

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{

            if(!order || order._id !== orderId ||successDelivered) {
                dispatch({type: ORDER_DELIVERED_RESET})
                dispatch({type: ORDER_PAID_RESET})
                dispatch(getOrderDetails(orderId))
            }
            // eslint-disable-next-line
        }
    },[order, orderId, successDelivered,history,userInfo,dispatch])

    const orderDeliveredHandler = () =>{
        dispatch(deliveredOrder(order))
    }

    const orderPaidHandler = () =>{
        dispatch(paidOrder(order))
    }

    return loading ? <Loader/> : error ? <Message className="danger"> {error} </Message> : <>

        <h4>ORDER ID: {order._id}</h4>
        <div className="row">
                <div className="col-md-8">
                    <ul className="list-group list-group-flush" >
                        
                        <li className="list-group-item" >
                            <h1>SHIPPING</h1>
                            <strong>Name: </strong>{order.user.name} <br/>
                            <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address} , {order.shippingAddress.city}{' '} , {order.shippingAddress.postalcode} , {order.shippingAddress.state}, {' '}{order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message>Delivered At: {order.deliveredAt}</Message> : <Message>Not Delivered</Message>}
                        </li>
                        <li className="list-group-item">
                            <h2>PAYMENT METHOD</h2>
                            <p><strong>Method: </strong>{order.paymentMethod}</p>
                            {order.isPaid ? <Message>Paid On: {order.paidAt}</Message> : <Message varient="alet-danger">Not Paid</Message>}
                        </li>
                        <li className="list-group-item">
                            <h2>ORDER ITEMS</h2>
                            {order.orderItems.length === 0 ? <Message>order is Empty</Message> : (
                                <ul className="list-group list-group-flush">
                                    {order.orderItems.map((items, index) => (
                                        <li className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <img src={items.image} alt={items.name} className="img-fluid" ></img>
                                                </div>
                                                <div className="col-md-6">
                                                    <Link to={`/product/${items.product}`} style={{textDecoration:'none', color:'black'}}>{items.name}</Link>
                                                </div>
                                                <div className="col-md-4">
                                                    {items.qty} x ₹{items.price} = ₹{items.qty * items.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h2>ORDER SUMMARY</h2>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Items</div>
                                    <div className="col">₹{order.itemsPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Shipping</div>
                                    <div className="col">₹{order.shippingPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Tax</div>
                                    <div className="col">₹{order.taxPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Total</div>
                                    <div className="col">₹{order.totalPrice}</div>
                                </div>
                            </li>
                            {loadingDelivered && <Loader/>}
                            {errorDelivered && <Message>{errorDelivered}</Message>}
                            <div className="row">
                                <div className="col-md-6">
                                    {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                    <li className="list-group-item">
                                        <button className="btn btn-dark" onClick={orderDeliveredHandler}>Mark As Delivered</button>
                                    </li>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    {userInfo && userInfo.isAdmin && !order.isPaid && order.paymentMethod==='COD' && (
                                    <li className="list-group-item">
                                        <button className="btn btn-success" onClick={orderPaidHandler}>Mark As Paid</button>
                                    </li>
                                    )}
                                </div>
                            </div>
                            
                            
                        </ul>
                    </div>
                </div>
            </div>
    </>
}

export default OrderScreen
