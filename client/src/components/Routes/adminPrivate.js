import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';


function AdminPrivate() {

    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    console.log("auth", auth);
    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
                console.log(res);
                if (res.data.ok) setOk(true);
                else setOk(false)
            }
            catch (err) {
                setOk(false);
            }
        }

        if (auth?.token) authCheck();

    }, [auth]);


    return ok ? <Outlet /> : <Spinner path="" />
}

export default AdminPrivate

