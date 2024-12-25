import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../../appwrite/authServ'
import { logout } from '../../sotre/authSlice'  

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandle = () => {
        authServices.authLogout.then(() => {
            dispatch(logout())
        })
    }
  return (
    <button>Logout</button>
  )
}

export default LogoutBtn