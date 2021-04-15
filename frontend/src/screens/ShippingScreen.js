import React, {useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/formContainer'
// import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions' 

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [postalcode, setPostalCode] = useState(shippingAddress.postalcode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalcode,state,country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
            <h1>SHIPPING</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group" id="address">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" placeholder="Enter Address" value={address} required onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="form-group" id="city">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" placeholder="Enter City" value={city} required onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="form-group" id="postalCode">
                    <label className="form-label">PostalCode</label>
                    <input type="text" className="form-control" placeholder="Enter PostalCode" value={postalcode} required onChange={(e) => setPostalCode(e.target.value)} />
                </div>
                <div className="form-group" id="state">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" placeholder="Enter state" value={state} required onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="form-group" id="country">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" placeholder="Enter Country" value={country} required onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="d-grid gap-2 py-2">
                    <button className="btn btn-dark" type="submit">Continue</button>
                </div>
            </form>
        </FormContainer>
    )
}

export default ShippingScreen
