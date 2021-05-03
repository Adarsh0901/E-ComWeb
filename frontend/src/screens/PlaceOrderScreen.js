import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import {createOrder} from '../actions/orderActions'
// import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = ({history}) => {

    const cart = useSelector(state => state.cart)


    //Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty , 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.04 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    },[history,success])

    const dispatch = useDispatch()
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <>
            {/* <CheckoutSteps step1 step2 step3 step4 /> */}
            <div className="row">
                <div className="col-md-8">
                    <ul className="list-group list-group-flush" >
                        
                        <li className="list-group-item" >
                            <h1>SHIPPING</h1>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address} , {cart.shippingAddress.city}{' '} , {cart.shippingAddress.postalcode} , {cart.shippingAddress.state}, {' '}{cart.shippingAddress.country}
                            </p>
                        </li>
                        <li className="list-group-item">
                            <h2>PAYMENT METHOD</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </li>
                        <li className="list-group-item">
                            <h2>ORDER ITEMS</h2>
                            {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message> : (
                                <ul className="list-group list-group-flush">
                                    {cart.cartItems.map((items, index) => (
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
                                    <div className="col">₹{cart.itemsPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Shipping</div>
                                    <div className="col">₹{cart.shippingPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Tax</div>
                                    <div className="col">₹{cart.taxPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Total</div>
                                    <div className="col">₹{cart.totalPrice}</div>
                                </div>
                            </li>
                            
                            {error && <Message varient="danger">{error}</Message>}

                            <li className="list-group-item">
                                <div className="d-grid gap-2 py-2">
                                    <button type="button" className="btn btn-dark btn-block" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>
                                        PLACE ORDER
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PlaceOrderScreen
