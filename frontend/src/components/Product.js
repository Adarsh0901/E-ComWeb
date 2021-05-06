import React from 'react'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    return (
        <div>
            <div className="card my-3 p-3 rounded" style={{height: '100%'}}>
                <Link to={`/product/${product._id}`}>
                    <img src={product.image} className="card-img-top img-fluid" alt={product.name} style={{height:'150px',width:'300px'}} />
                </Link>
                <div className="card-body">
                    <Link to={`/product/${product._id}`} style={{textDecoration:'none', color:'black'}}>
                        <div className="card-title strong">{product.name.slice(0,40)}</div>
                    </Link>
                    <Rating value={product.rating} text={`${product.numReviews} Reviews `} />
                    <h4>₹{product.price}</h4>
                </div>
            </div>
        </div>
    )
}

export default Product
