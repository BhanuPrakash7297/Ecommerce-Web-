
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import Privacy from './pages/PrivacyPolicy'
import Register from './auth/Register';
import Login from './auth/Login';
import Logout from './auth/Logout'
import Dashboard from './components/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './auth/ForgotPassword';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminPrivate from './components/Routes/adminPrivate';
import CreateProduct from './components/admin/CreateProduct';
import CreateCategory from './components/admin/CreateCategory';
import Users from './components/admin/Users';
import Profile from './components/user/Profile'
import Order from './components/user/Order'
import Product from './components/admin/Product';
import UpdateProduct from './components/admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoriesProduct';
import Cart from './pages/Cart';
import AdminOrders from './components/admin/adminOrders';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/Home' />} />
        <Route path='/search' element={<Search />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/order' element={<Order />} />

        </Route>
        <Route path='/dashboard' element={<AdminPrivate />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/products' element={<Product />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<AdminOrders />} />


        </Route>

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </>
  );
}

export default App;


