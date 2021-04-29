import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import {addToCart, removeFromCart} from '../actions/cartActions'

const CartScreen = ({match, location, history}) => {

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[dispatch, productId, qty])

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-8">
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (<Message>Your cart is Empty<Link to='/'>GO Back</Link></Message>) : (
                    <ul className="list-group list-group-flush">
                        {cartItems.map((items) => (
                            <li className="list-group-item" key={items.product}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <img src={items.image} alt={items.name} className="img-fluid" ></img>
                                    </div>
                                    <div className="col-md-3">
                                        <Link to={`/product/${items.product}`} style={{textDecoration:'none', color:'black'}}>{items.name}</Link>
                                    </div>
                                    <div className="col-md-2">
                                    ₹{items.price}
                                    </div>
                                    <div className="col-md-2">
                                        <select value={items.qty} onChange={(e) => dispatch(addToCart(items.product, Number(e.target.value)))}>
                                            {[...Array(items.countInStock).keys()].map((x) => (

                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-dark" onClick={() => removeFromCartHandler(items.product)}><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
                <div className="col-md-4">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" >
                            <h2>SubTotal({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h2>
                            ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </li>
                        <li className='list-group-item'>
                            <button type="button" className="btn btn-dark btn-block" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
