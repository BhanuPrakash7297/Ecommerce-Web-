
import React from 'react'
import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../styles/AuthStyles.css'
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");



    const submitHandler = async (e) => {
        e.preventDefault();


        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                email,
                name,
                password,
                address,
                phone,
                answer
            });

            // console.log("res", res);

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            }

            else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Something went Wrong');
        }

        setName("");
        setAddress("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAnswer("");
    }


    return (
        <>
            <Layout title={'register'}>
                <div className="form-container">
                    <h1>registration page</h1>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">

                            <input type="text" className="form-control" id="exampleInputName" value={name} placeholder='Enter Your Name' onChange={(e) => {
                                setName(e.target.value)
                            }} />

                        </div>
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

                            <input type="text" className="form-control" id="exampleInputNumber" value={phone} placeholder='Enter Your Number' onChange={(e) => {
                                setPhone(e.target.value)
                            }} />

                        </div>
                        <div className="mb-3">

                            <input type="text" className="form-control" id="exampleInputAddress" value={address} placeholder='Enter Your Adddress' onChange={(e) => {
                                setAddress(e.target.value)
                            }} />

                        </div>

                        <div className="mb-3">

                            <input type="text" className="form-control" id="exampleInputAnswer" value={answer} placeholder='which is your favourite game' onChange={(e) => {
                                setAnswer(e.target.value)
                            }} />

                        </div>


                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                </div>


            </Layout>
        </>
    )
}

export default Register


