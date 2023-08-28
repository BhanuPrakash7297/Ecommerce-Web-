import React from 'react'
import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AuthStyles.css'
import { useAuth } from '../components/context/auth';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email,
                password
            });


            // console.log("res", res);

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });

                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            }


            else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Something went Wrong');
        }

        setPassword("");
        setEmail("");

    }



    return (
        <>
            <Layout title={'register'}>
                <div className="form-container">
                    <h1>Login Page</h1>
                    <form onSubmit={submitHandler}>

                        <div className="mb-3">

                            <input type="text" className="form-control" id="exampleInputEmail" value={email} placeholder='Enter Your Email' onChange={(e) => {
                                setEmail(e.target.value)
                            }} />

                        </div>
                        <div className="mb-3">

                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} placeholder='Enter Your Password' onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-primary" onClick={() => navigate('/forgotpassword')}>password reset</button>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>


            </Layout>
        </>
    )
}

export default Login

