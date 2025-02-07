import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../../appwrite/authServ'
import { logout } from '../../sotre/authSlice'  
import { useNavigate } from 'react-router'

function LogoutBtn({className}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandle = () => {
        authServices.authLogout().then(() => {
            dispatch(logout())
            navigate("/")
        })
    }
  return (
    <button onClick={logoutHandle} className={className}>Logout</button>
  )
}

export default LogoutBtn