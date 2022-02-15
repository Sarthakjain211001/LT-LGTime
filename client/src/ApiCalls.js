import axios from "axios";

const baseURL = "http://localhost:5000/api";


//Writing all the api calls here at one place

export const LoginCall = async (data)=>{
  const res = await axios.post(`${baseURL}/auth/login`, data, {withCredentials: true});
  return res;
}

export const SignupCall = async (data)=>{
    const res = await axios.post(`${baseURL}/auth/signup`, data, {withCredentials: true});
    return res;
}

export const getUserCall = async ()=>{
    const res = await axios.get(`${baseURL}/auth/getUser`, {withCredentials: true});
    return res;
}

export const LogoutCall = async ()=>{
    const res = await axios.get(`${baseURL}/auth/logout`, {withCredentials: true});
    return res;
}

export const uploadPost = async(data)=>{
    const res = await axios.post(`${baseURL}/post/create`, data, {withCredentials: true});
    return res;
}

export const fetchAllPosts = async()=>{
    const res = await axios.get(`${baseURL}/post/fetchPosts`, {withCredentials: true});
    return res;
}

