import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  forgotPasswordSuccess,
  forgotPasswordFail,
  forgotPasswordRequest,
} from "../slices/authSlice";
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from "../slices/userSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const {data}  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { email, password });
    localStorage.setItem("token", data.token);
    dispatch(loginSuccess(data));
    
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
    localStorage.removeItem("token");
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

export const loadUser =  async (dispatch) => {

  try {
      dispatch(loadUserRequest())

      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null; 
      }
    
      const token = getCookie("token");
      console.log(token);

      if (!token) return dispatch(loadUserFail("Not authenticated"))
      const { data }  = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userprofile`);
      dispatch(loadUserSuccess(data))
  } catch (error) {
      const response = error.response.data.message
      if(!response){
        dispatch(loadUserFail('error in fetching data'))
      }else{
        dispatch(loadUserFail(response))
      }
  }

}

export const logout =  async (dispatch) => {

  try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`);
      dispatch(logoutSuccess())
  } catch (error) {
      dispatch(logoutFail)
  }

}

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/update/profile`, userData, config);
    dispatch(updateProfileSuccess(data));
    
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

export const updatePassword = (formData) => async (dispatch) => {

  try {
      dispatch(updatePasswordRequest())
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/change/password`, formData, config);
      dispatch(updatePasswordSuccess())
  } catch (error) {
      dispatch(updatePasswordFail(error.response.data.message))
  }

}

export const forgotPassword = (formData) => async (dispatch) => {

  try {
      dispatch(forgotPasswordRequest())
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      const { data} =  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/password/forgot`, formData, config);
      dispatch(forgotPasswordSuccess(data))
  } catch (error) {
      dispatch(forgotPasswordFail(error.response.data.message))
  }

}

export const resetPassword = (formData, token) => async (dispatch) => {

  try {
      dispatch(resetPasswordRequest())
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      const { data} =  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/password/reset/${token}`, formData, config);
      dispatch(resetPasswordSuccess(data))
  } catch (error) {
      dispatch(resetPasswordFail(error.response.data.message))
  }

}

export const getUsers =  async (dispatch) => {

  try {
      dispatch(usersRequest())
      const { data }  = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/users`);
      dispatch(usersSuccess(data))
  } catch (error) {
      dispatch(usersFail(error.response.data.message))
  }

}

export const getUser = id => async (dispatch) => {

  try {
      dispatch(userRequest())
      const { data }  = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/user/${id}`);
      dispatch(userSuccess(data))
  } catch (error) {
      dispatch(userFail(error.response.data.message))
  }

}

export const deleteUser = id => async (dispatch) => {

  try {
      dispatch(deleteUserRequest())
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/user/${id}`);
      dispatch(deleteUserSuccess())
  } catch (error) {
      dispatch(deleteUserFail(error.response.data.message))
  }

}

export const updateUser = (id, formData) => async (dispatch) => {

  try {
      dispatch(updateUserRequest())
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/user/${id}`, formData, config);
      dispatch(updateUserSuccess())
  } catch (error) {
      dispatch(updateUserFail(error.response.data.message))
  }

}

