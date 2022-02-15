import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserCall, LoginCall } from '../../ApiCalls';
import './Login.css'

const Login = ({currUser, setCurrUser}) => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");

    const handleLogin=async(e)=>{
        document.getElementById("notificationpara").style.display="block";   //for displaying loggin in.. when the user clicks on login button
        e.preventDefault();        //to prevent page from reloading

        const data = {
            email : email,
            password: password,
        }

        const res = await LoginCall(data);      //api call for login
        if(res.data.error){
            seterror(res.data.error);
        }
        else if(res.data.authToken){
            const resUser2 = await getUserCall();       //after login .. api call for getting the user data.
            if(resUser2.data.User) 
         {
            document.getElementById("notificationpara").style.display="none";    //removing logging in...please wait
            setCurrUser(resUser2.data.User.username);         //updating currUser state
         }     
         else{
             setCurrUser(null);
         }
        }
        else{
            seterror(res.data.error);
        }
    }

    useEffect(async()=>{
        document.getElementById("notificationpara").style.display="block";          //To display loggin in.. when the page loads. 
        const resUser = await getUserCall();                 //checking if the authToken is ppesent
        if(resUser.data.User)
        {
            document.getElementById("notificationpara").style.display="none";         //if token is present then remove the loggin in... and log in the user
            setCurrUser(resUser.data.User.username);
        }     
       else{
        document.getElementById("notificationpara").style.display="none";           //if no token found then also remove the logging in...
           setCurrUser(null);
       }


    }, []);

    useEffect(() => {              //for displaying the error msg whenever the error state changes.
        if(error){
            document.getElementById("errpara").style.display="block";
            document.getElementById("errpara").innerHTML=error;
            document.getElementById("notificationpara").style.display="none";

            setTimeout(() => {       //removing the err msg after 3 sec
                document.getElementById("errpara").style.display="none";
                seterror("");

            }, 3000);
        }
        else{
            document.getElementById("errpara").style.display="none";
            document.getElementById("errpara").innerHTML=error;
            document.getElementById("notificationpara").style.display="none";
        }
      }, [error])


  return (
<>
            <div className="container">
                <div className="myCard">
                    <div className="row">
                        <div className="col-md-11">
                            <div className="myLeftCtn">
                                <form onSubmit={handleLogin} className="myForm text-center">
                                    <header>Log in</header>

                                    <div className="form-group">
                                        <i className="fas fa-envelope"></i>
                                        <input className="myInput mb-4" placeholder="Email" type="text" id="email" onChange={(e)=>{setemail(e.target.value)}} required={true}/>
                                    </div>

                                    <div className="form-group">
                                        <i className="fas fa-lock"></i>
                                        <input className="myInput mb-5" type="password" id="password" placeholder="Password"  onChange={(e)=>{setpassword(e.target.value)}} minLength={5} required={true}/>
                                    </div>
                                    
                                    <button type="submit" className="butt mb-2" >Login</button>

                                    <p className='mt-3'>Don't have an account ? <Link to="/signup">Signup</Link></p>
                                    <p id="errpara" className='text-danger fw-bold'></p>
                                    <p id="notificationpara" className='text-primary fw-bold'>Loggin in... please wait</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


);
}

export default Login