import React from 'react'
import {Link} from 'react-router-dom'

const CheckoutSteps = ({step1,step2,step3,step4}) => {
    return (
        <nav className='justify-content-center mb-4'>
            <ul className='navbar-nav me-2'>
                <li className='nav-item'>
                    {step1 ? (
                    <Link to='/login'>
                        <ul className='navbar-nav me-2'>
                        <li className='nav-link'>Sign In</li>
                        </ul>
                    </Link>
                    ) : (
                    <ul className='navbar-nav me-2'>
                    <li className='nav-link' disabled>Sign In</li>
                    </ul>
                    )}
                </li>
                <li className='nav-item'>
                    {step2 ? (
                    <Link to='/shipping'>
                        <ul className='navbar-nav me-2'>
                        <li className='nav-link'>Shipping</li>
                        </ul>
                    </Link>
                    ) : (
                        <ul className='navbar-nav me-2'>
                        <li className='nav-link' disabled>Shipping</li>
                        </ul>
                    )}
                </li>
                <li className='nav-item'>
                    {step3 ? (
                    <Link to='/payment'>
                        <ul>
                        <li className='nav-link'>Payment</li>
                        </ul>
                    </Link>
                    ) : (
                        <ul>
                        <li className='nav-link' disabled>Payment</li>
                        </ul>
                    )}
                </li>
                <li className='nav-item'>
                    {step4 ? (
                    <Link to='/placeorder'>
                        <ul>
                        <li className='nav-link'>Place Order</li>
                        </ul>
                    </Link>
                    ) : (
                        <ul>
                        <li className='nav-link' disabled>Place Order</li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default CheckoutSteps
