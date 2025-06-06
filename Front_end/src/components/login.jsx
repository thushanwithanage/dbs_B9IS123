import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "../css/login.css";
import config from '../config';

class Login extends Component {
    state = {
        email: "",
        password: "",
        showErrorAlert: false,
        alertHeading: "",
        alertData: "",
    };

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = async (e) => {
        e.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password,
        };

        try 
        {
            const {data} = await axios.post(`${config.apiUrl}/auth`, user);
            if(data)
            {
                window.location.href = "/admin";
            }
            else
            {
                window.location.href = "/plist";
            }
        } 
        catch (e) 
        {
            toast.error(e.response.data.error);
        }
    };

    render() {
        const { email, password } = this.state;
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card p-4 shadow-sm">
                            <h3 className="text-center mb-4">Pet Shop</h3>
                            <form onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.changeHandler}
                                        placeholder="Enter email"
                                        className="form-control"
                                        id="email"
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.changeHandler}
                                        placeholder="Enter password"
                                        className="form-control"
                                        id="password"
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ToastContainer />
            </div>
        );
    }
}

export default Login;