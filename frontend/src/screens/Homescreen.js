import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import {listProducts} from '../actions/productActions'
import Loader from '../components/loader'
import Message from '../components/message'

const Homescreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector( state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts())
    },[dispatch])



    return (
        <>
            <h1>Latest Product</h1>
            {loading ? <Loader/> : error ? <Message varient='danger'>{error}</Message> :  
                <div className="row container">
                    {products.map(product => (
                        <div key={product._id} className="col-md-3">
                            <Product product={product}/>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default Homescreen
