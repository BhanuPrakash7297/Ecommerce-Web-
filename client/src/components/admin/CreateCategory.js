import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import AdminMenu from '../Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../Form/CategoryForm'

import { Button, Modal } from 'antd';
import 'antd/dist/reset.css';

const CreateCategory = () => {
    const [Categories, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const confirmOperation = (c) => {

        const check = window.confirm('do u want to updatae this :');

        if (check) {
            setVisible(true);
            setUpdatedName(c.name);
            setSelected(c)
        }
        else {
            setVisible(false);
            setUpdatedName("");
            setSelected(null);
        }
    }
    const confirmDeleteOperation = (id) => {

        const check = window.confirm('do u want to Delete This Category');

        if (check) {
            DeleteHandler(id);
        }

    }


    const UpdateHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {
                name: updatedName
            });

            if (data.success) {
                setSelected(null);

                setVisible(false);
                getAllCategories();
                toast.success(`${updatedName} is is updated successfully`);
                setUpdatedName("");
            }

        } catch (err) {
            console.log(err);
            toast.error('something went wrong here');
        }
    }
    const DeleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/deletecategory/${id}`);

            if (data.success) {
                getAllCategories();
                toast.success(`${updatedName} is is updated successfully`);
            }

        } catch (err) {
            console.log(err);
            toast.error('something went wrong here');
        }
    }



    const submitHandler = async (e) => {
        try {
            e.preventDefault();

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {
                name
            });

            if (data?.success) {
                toast.success(`${name} created successfully`);
                getAllCategories();
                setName("");
            }
            else {
                toast.error(data?.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.success('sumething went wrong');
        }

    }
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/allcategory`);
            console.log("data here ;::::::::", data);
            if (data.success) {
                setCategory(data.allCategory);

            }
        }
        catch (err) {
            console.log(err);
            toast.error('something went wrong');
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    // update category


    return (

        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className='p-3'><CategoryForm submitHandler={submitHandler} value={name} setValue={setName} /></div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => { confirmOperation(c) }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                        onClick={() => confirmDeleteOperation(c._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </td>
                                            </tr >
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <Modal onCancel={() => setVisible(false)} footer={null} open={visible} ><CategoryForm value={updatedName} setValue={setUpdatedName} submitHandler={UpdateHandler} /></Modal>
                </div>
            </div>
        </Layout >
    )
}

export default CreateCategory
