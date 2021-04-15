import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch All Products in localhost:4000/api/products
const getProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({})

    res.json(products)
})

//Get a product By Id  GET /api/products/:id   Public
const getProductById = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product Not Found');
    }
})

//Delete product  DELETE /api/products/:id   Private/Admin
const deleteProduct = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message : 'Product Removed'})
    }else{
        res.status(404)
        throw new Error('Product Not Found');
    }
})

//Create A product  POST /api/products   Private/Admin
const createProduct = asyncHandler(async(req,res) =>{
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpeg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//Update a product  PUT /api/products/:id   Private/Admin
const updateProduct = asyncHandler(async(req,res) =>{
    const{
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// create new review  POST /api/product/:id/review  private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProductReview,
}