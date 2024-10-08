import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuthError, updateProfile } from "../../actions/userActions";
import { toast } from "react-toastify";
import { clearUpdateProfile } from "../../slices/authSlice";
const Updateprofile = () => {
    const { loading, error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeAvatar = (event)=>{
        const file = event.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("avatar", avatar);
        dispatch(updateProfile(formData));

    }

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            if(user.avatar){
                setAvatarPreview(user.avatar)
            }
        }
        if(isUpdated){
            toast("User updated in successfully", {
                position: "bottom-center",
                type: "success",
                onOpen: () => {
                  dispatch(clearUpdateProfile());
                },
              });
              navigate('/myprofile')
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
    },[user, isUpdated, error, dispatch, navigate])

  return (
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" enctype="multipart/form-data" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChangeAvatar}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading}>
              Update
            </button>
          </form>
        </div>
      </div>
  )
}

export default Updateprofile
