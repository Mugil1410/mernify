import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import ProductDetail from "./components/product/ProductDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductSearch from "./components/product/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from './store'
import { useEffect} from "react";
import { loadUser } from "./actions/userActions";
import UserProfile from "./components/user/UserProfile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Updateprofile from "./components/user/Updateprofile";
import UpdatePassword from "./components/user/UpdatePassword";
import ResetPassword from "./components/user/ResetPassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import OrderDetail from "./components/order/OrderDetail";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewList from "./components/admin/ReviewList";



function App() {

  const stripeApiKey = 'pk_test_51PbtbyRu57BrIIqqAPLexiM7bHYV9mEF6aFQAZ7xXRsehlux8ZWkC4jTRmtMHmWrzTTwLHAlyaHaaS5Oy8wzkq1w00sNxdfcbq'
  
  useEffect(()=>{
    store.dispatch(loadUser)
  },[])
  
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<ProductSearch/>} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/myprofile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
              <Route path="/update/profile" element={<ProtectedRoute><Updateprofile/></ProtectedRoute>}/>
              <Route path="/change/password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
              <Route path="/password/reset/:token" element={<ResetPassword/>}/>
              <Route path="/password/forgot" element={<ForgotPassword/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
              <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
              {stripeApiKey &&  <Route path="/payment" element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute>}/> }
              <Route path="/order/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
              <Route path="/orders" element={<ProtectedRoute><UserOrders/></ProtectedRoute>}/>
              <Route path="/order/:id" element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}/>
            </Routes>
          </div>
           {/* Admin Routes */}
          <Routes>
           <Route path='/admin/dashboard' element={ <ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> } />
           <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute> } />
           <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } />
           <Route path='/admin/product/:id' element={ <ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />
           <Route path='/admin/orders' element={ <ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute> } />
           <Route path='/admin/order/:id' element={ <ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } />
           <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
           <Route path='/admin/user/:id' element={ <ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
           <Route path='/admin/reviews' element={ <ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } /> 
         </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );

  
}

export default App;
