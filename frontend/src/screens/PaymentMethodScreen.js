import React, {useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/formContainer'
// import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions' 

const PaymentMethodScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
            <h1>PAYMENT METHOD</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group" id="address">
                    <label as="legend" className="form-label">Select Method</label>
                </div>
                <div className="col">
                    
                    <div className="form-check">
                        <input className="form-check-input" type="radio" label="PayPal or Credit Card" name="paymentMethod" id="PayPal" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}/>
                        <label className="form-check-label">
                            PayPal or Credit Card
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" label="COD" name="paymentMethod" id="COD" value="COD" onChange={(e) => setPaymentMethod(e.target.value)}/>
                        <label className="form-check-label">
                            COD(Case On Delivery)
                        </label>
                    </div>
                </div>
                <div className="d-grid gap-2 py-2">
                    <button className="btn btn-dark" type="submit">Continue</button>
                </div>
            </form>
        </FormContainer>
    )
}

export default PaymentMethodScreen
