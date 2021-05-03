import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {listUsers, deleteUsers} from '../actions/userActions'

const UserListScreen = ({history}) => {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    },[dispatch,history,userInfo, successDelete])

    const deleteHandler = (id) =>{
        if(window.confirm('Are You Sure?')){
            dispatch(deleteUsers(id))
        }
    }
    return (
        <>
            <h1>USERS</h1>
            {loading ? <Loader/> : error ? <Message>{error}</Message>: (
                <div className="table-responsive">
                <table className="table table-responsive table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>GENDER</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.gender}</td>
                                <td>{user.isAdmin ?  (<i className="fas fa-check" style={{color: 'green'}}></i>) : (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <Link to={`/admin/user/${user._id}/edit`}>
                                        <button className="btn btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </Link>
                                    <Link to={`/admin/userlist`}>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen
