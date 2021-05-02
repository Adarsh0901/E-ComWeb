import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../actions/userActions'
import './Header1.css'

const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand mr-auto" to="/">Amaze-Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse dFlec" id="navbarNavDropdown">
                        <ul className="nav navbar-nav me-2">
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link>
                            </li>
                            <li className="nav-item">
                                {userInfo ? (
                                    <ul className="nav navbar-nav me-2">
                                        <li className="dropdown nav-item">
                                            <Link to="/" className='nav-link'><i className="fas fa-user"></i> &nbsp;{userInfo.name} <i className="fas fa-angle-down"></i></Link>
                                            <div className="dropdown-content">
                                                {userInfo.isAdmin ? (
                                                    <>
                                                    <Link to="/admin/userlist"><i className="fas fa-users"></i> &nbsp;Users</Link>
                                                    <Link to="/admin/productlist"><i className="fab fa-product-hunt"></i> &nbsp;Products</Link>
                                                    <Link to="/admin/orderlist"><i className="fas fa-clipboard-list"></i> &nbsp;Orders</Link>
                                                    </>
                                                ) : (
                                                <Link to="/profile"><i className="far fa-id-card"></i> &nbsp;Profile</Link>
                                                )}
                                                <Link to='/' onClick={logoutHandler}><i className="fas fa-sign-out-alt"></i> &nbsp;Logout</Link>
                                            </div>
                                        </li>
                                    </ul>
                                    
                                ) : 
                                (<Link className="nav-link" to="/login"><i className="fas fa-user"></i> Sign In</Link>)}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header