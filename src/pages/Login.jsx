import React, { Fragment } from "react"
import LoginForm from '../components/LoginForm'
import 'bootstrap/dist/css/bootstrap.css'
import './css/Login.css'
import logo from '../images/Logo.png'

const Login = () => {
    return (
        <Fragment>
            <div id="login">
                <div className="container-fluid">
                    <div className="row  align-items-center minh-100 bg-login-alt">
                        <div className="col-md-7 col-0 minh-100 bg-login no-display">
                        </div>
                        <div className="col-md-5 col-12 ">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-sm-8 col-10">
                                    <img src={logo} alt="" className="img-fluid px-5 my-4"/>
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Login;