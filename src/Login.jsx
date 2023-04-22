import React from 'react'
import MobileLogin from './MobileLogin';
import GoogleLogin from './GoogleLogin';

const Login = () => {
    return (
        <div className='container-fluid row justify-content-center'>
            <div className="card w-50 text-center">
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    <MobileLogin />
                    <GoogleLogin />
                </div>
            </div>
        </div>

    )
}

export default Login