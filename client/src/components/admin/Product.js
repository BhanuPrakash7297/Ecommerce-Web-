import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import AdminMenu from '../Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Product = () => {
    const [products, setProducts] = useState([]);


    const AllProducts = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/getproduct`);
            if (data?.success) {
                setProducts(data.product);
            }

        } catch (err) {
            console.log(err);
            toast.error('Something Went Wrong');
        }
    }

    useEffect(() => {
        AllProducts();
    }, []);


    return (
        <>
            <Layout title={'products'}>
                <div className='row'>
                    <div className='col-md-3 mb-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>Products List</h1>
                        <div className='d-flex flex-wrap'>
                            {
                                products?.map((p) => (
                                    <Link key={p._id}
                                        to={`/dashboard/admin/product/${p.slug}`}
                                        className="product-link">
                                        <div className="card m-2" style={{ width: '18rem' }} >

                                            <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />

                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">{p.description}</p>

                                            </div>
                                        </div>

                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default Product