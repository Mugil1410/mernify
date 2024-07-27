import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { logout } from "../../actions/userActions";
import { useEffect } from "react";


const Header = () => {

  const {isAuthenticated, user} = useSelector(state => state.authState)
  const { items:cartItems } = useSelector(state => state.cartState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  }

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="150px" alt="brand-logo" src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      {isAuthenticated ? 
        (
          <Dropdown className='d-inline' >
            <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
              <figure className="avatar avatar-nav">
                <Image width="50px" src={user.avatar ? user.avatar: './images/profile.png'} roundedCircle />
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
            <DropdownMenu>
              {user.role==='admin' && <Dropdown.Item onClick={()=>(navigate('/admin/dashboard'))} className="text-dark">Dashboard</Dropdown.Item> }
              <Dropdown.Item onClick={()=>(navigate('/myprofile'))} className="text-dark">Profile</Dropdown.Item>
              <Dropdown.Item onClick={()=>(navigate('/orders'))}>Orders</Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={logoutHandler}>Logout</Dropdown.Item>
            </DropdownMenu>
          </Dropdown>
        ) :
        <Link to="/login" className="btn" id="login_btn">
          Login
        </Link>
       }
        
       <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
  );
};

export default Header;
