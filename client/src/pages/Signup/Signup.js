import React from 'react';
import { useState, useEffect } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { getUserCall, SignupCall } from '../../ApiCalls';

const Signup = ({currUser ,setCurrUser}) => {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState("");

    const handleSignup=async(e)=>{
        document.getElementById("notificationpara").style.display="block"; //for displaying sigining up.. when the user clicks on signup button
        e.preventDefault();

        const data={
            username: username,
            email: email,
            password: password
        }

        const res = await SignupCall(data);  //api call for signup

        if(res.data.error){
            seterror(res.data.error);
        }
        else if(res.data.authToken){
            const resUser2 = await getUserCall();
            if(resUser2.data.User)
         {
            document.getElementById("notificationpara").style.display="none"; //removing the notification of signup
            setCurrUser(resUser2.data.User.username);
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
        document.getElementById("notificationpara").style.display="block";  
        const resUser = await getUserCall();
        if(resUser.data.User)
        {
            document.getElementById("notificationpara").style.display="none";
            
           setCurrUser(resUser.data.User.username);
        }     
       else{
        document.getElementById("notificationpara").style.display="none";
           setCurrUser(null);
       }


    }, []);

    useEffect(() => {           //controlling the err msg when the errro state changes
        if(error){
            document.getElementById("errpara").style.display="block";
            document.getElementById("errpara").innerHTML=error;
            document.getElementById("notificationpara").style.display="none";

            setTimeout(() => {
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
                                <form onSubmit={handleSignup} className="myForm text-center">
                                    <header>Create a new account</header>
                                    <div className="form-group">
                                        <i className="fas fa-user"></i>
                                        <input className="myInput mb-3" type="text" placeholder="Username" id="username"  onChange={(e)=>{setusername(e.target.value)}} required minLength={3}/>
                                    </div>

                                    <div className="form-group">
                                        <i className="fas fa-envelope"></i>
                                        <input className="myInput mb-3" placeholder="Email" type="text" id="email" onChange={(e)=>{setemail(e.target.value)}} required/>
                                    </div>

                                    <div className="form-group">
                                        <i className="fas fa-lock"></i>
                                        <input className="myInput mb-4" type="password" id="password" placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}} required minLength={5}/>
                                    </div>
         <button type="submit" className="butt mb-2" >Signup</button>
 
<p className='mt-3'>Already have an account ? <Link to="/login">Login</Link></p>
<p id="errpara" className='text-danger fw-bold'></p>
<p id="notificationpara" className='text-primary fw-bold'>Signing Up.... please wait</p>

                                </form>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
