import React from "react";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";


const UserProfile = () => {

  const {user} = useSelector(state => state.authState)

  return (
    <div className="container container-fluid">
      <h2 className="mt-5 ml-5">My Profile</h2>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <img
              className="rounded-circle img-fluid"
              src={user.avatar ? user.avatar: './images/profile.png'}
              alt=""
            />
          </figure>
          <Link to={'/update/profile'} id="edit_profile" className="btn btn-primary btn-block my-5"> Edit Profile</Link>
        </div>

        <div className="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{user.name}</p>

          <h4>Email Address</h4>
          <p>{user.email}</p>

          <h4>Joined at</h4>
          <p>{String(user.createdAt).slice(0,10)}</p>

          <Link to={'/orders'} className="btn btn-danger btn-block mt-5">My Orders</Link>
          <Link to={'/change/password'} className="btn btn-primary btn-block mt-3">Change Password</Link>
          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
