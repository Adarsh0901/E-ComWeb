import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {listProducts , deleteProduct, createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListScreen = ({history, match}) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate ,product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    },[dispatch,history,userInfo, successDelete,createdProduct,successCreate])

    const deleteHandler = (id) =>{
        if(window.confirm('Are You Sure?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }
    return (
        <>
            <div className="row align-items-center">
                <div className="col-md-10">
                    <h1>PRODUCTS LIST</h1>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-dark" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </button>
                </div>
            </div>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message>{errorDelete}</Message>}
            {loadingCreate && <Loader/>}
            {errorCreate && <Message>{errorCreate}</Message>}
            {loading ? <Loader/> : error ? <Message>{error}</Message>: (
                <div className="table-responsive">
                <table className="table table-responsive table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name.slice(0,30)}</td>
                                <td>₹{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link to={`/admin/product/${product._id}/edit`}>
                                        <button className="btn btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </Link>
                                    <Link to={`/admin/productlist`}>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </>
    )
}

export default ProductListScreen
