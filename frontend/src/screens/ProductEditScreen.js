import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import FormContainer from '../components/formContainer' 
import { listProductDetails,updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

  
  
    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{

            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
        
    },[product,productId,dispatch,successUpdate,history])

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config ={
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct({_id: productId,name,price,image,brand,category,countInStock,description,}))
    }

    return (
        <FormContainer>
            <center><h1>EDIT PRODUCT</h1></center> 
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message >{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message varient='danger'>{error}</Message> : (
                <form onSubmit={submitHandler}>
                    <div className="form-group" id='name'>
                        <label className="form-label">Name</label>
                        <input type="name" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group py-2" id='price'>
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group py-2" id='image'>
                        <label className="form-label">Image</label>
                        <input type="text" className="form-control" placeholder="Enter image url" value={image} onChange={(e) => setImage(e.target.value)} />
                        <div className="input-group">
                            <input type="file" className="form-control" id="image-file" onChange={uploadFileHandler}/>
                            <label class="input-group-text">Upload</label>
                        </div>
                        {uploading && <Loader/>}
                    </div>
                    <div className="form-group py-2" id='brand'>
                        <label className="form-label">Brand</label>
                        <input type="text" className="form-control" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div className="form-group py-2" id='category'>
                        <label className="form-label">category</label>
                        <input type="text" className="form-control" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="form-group py-2" id='countInStock'>
                        <label className="form-label">CountInStock</label>
                        <input type="number" className="form-control" placeholder="Enter countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                    </div>
                    <div className="form-group py-2" id='description'>
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="d-grid gap-2 py-2">
                        <button className="btn btn-dark" type='submit' varient='primary'>Update</button>
                    </div>
                </form>
            )}
        </FormContainer>
    )
}

export default ProductEditScreen
