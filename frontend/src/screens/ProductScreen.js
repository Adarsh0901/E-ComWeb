import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import Message from '../components/message'
import Loader from '../components/loader'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails, createProductReview} from '../actions/productActions'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'


const ProductScreen = ({history,match}) => {
    
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector( state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector( state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector( state => state.productReviewCreate)
    const {error: errorProductReview, success: successProductReview} = productReviewCreate

    useEffect(() => {
        if(successProductReview){
            alert('Rating Submitted!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    },[dispatch, match,successProductReview])

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {rating,comment}))
    }

    return( 
        <div>
            <Link className='btn btn-light my-2' to='/'>Go Back</Link>
            {loading ? <Loader/> : error ? <Message varient='danger'>{error}</Message> : 
            <>
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-fluid" src={product.image} alt={product.name}></img>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><h3>{product.name}</h3></li>
                            <li className="list-group-item"><Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating></li>
                            <li className="list-group-item"><h4>Price: ${product.price}</h4></li>
                            <li className="list-group-item"><p>{product.description}</p></li>
                        </ul>
                        
                    </div>
                    <div className="col-md-2">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-md-5">
                                            Price:
                                        </div>
                                        <div className="col-md-7">
                                        ${product.price}
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-md-5">
                                            Status:
                                        </div>  
                                        <div className="col-md-7">
                                            {product.countInStock>0 ? 'In Stock' : 'Out Of Stock'}
                                        </div>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-md-5">
                                            Oty:
                                        </div>  
                                        <div className="col-md-7">
                                            <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x) => (

                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                )}
                                
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-dark" type="button" disabled={product.countInStock===0} onClick={addToCartHandler}>Add To Cart</button>
                                            </div>
                                        </div> 
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h2>WRITE A CUSTOMER REVIEW</h2>
                                {errorProductReview && <Message>{errorProductReview}</Message>}
                                {userInfo ? (
                                    <form onSubmit={submitHandler}>
                                        <div className="input-group" id='rating'>
                                            <div className="mb-3">
                                                <label className="form-label">Rating</label>
                                                    <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)} >
                                                        <option value=''>select rating...</option>
                                                        <option value="1">1-poor</option>
                                                        <option value="2">2-Fair</option>
                                                        <option value="3">3-Good</option>
                                                        <option value="4">4-Very Good</option>
                                                        <option value="5">5-Excellent</option>
                                                    </select>
                                            </div>
                                        </div>
                                        <div className="input-group" id='comment'>
                                            <div className="mb-3">
                                                <label className="col-sm-3 col-form-label">Comment</label>
                                                <textarea className="form-control" rows="2" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" type="submit">Submit</button>
                                    </form>
                                ) : <Message>Please <Link to='/login'> sign in</Link> to write a review</Message>}
                            </li>
                            <li className="list-group-item">
                            <strong><h2>REVIEWS</h2></strong>
                            {product.reviews.length === 0 && <Message>No Review</Message>}
                            <ul className="list-group list-group-flush">
                                {product.reviews.map(review => (
                                <li className="list-group-item" key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating}/>
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6"></div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProductScreen
