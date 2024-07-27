import { useEffect, useState} from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from'react-redux';
import { clearAuthError, register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const{loading,error,isAuthenticated}=useSelector(state => state.authState)

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar:null
  })
  
  const [avatar, setAvatar] =  useState('')
  const [avatarPreview, setAvatarPreview] = useState ('/images/profile.png')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const onChange = (e) => {
    if(e.target.name === 'avatar'){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
    setUserData({...userData, [e.target.name]: e.target.value });
    
  }
  const submitHandler = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('avatar', avatar);
    dispatch(register(formData))
    
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast("Logged in successfully", {
        position: "bottom-center",
        type: "success",
      });
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg" enctype="multipart/form-data">
          <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input name="name" type="name" id="name_field" className="form-control" onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              name="email"
              type="email"
              id="email_field"
              className="form-control"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              name="password"
              type="password"
              id="password_field"
              className="form-control"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="profile_image"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  accept="image/*"
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                  
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>
          <button id="register_button" type="submit" className="btn btn-block py-3" disabled={loading}>
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
