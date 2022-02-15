import React from 'react'
import { useState, useEffect } from 'react';
import { getUserCall, LoginCall, uploadPost } from '../../ApiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import './UploadPost.css'
import axios from 'axios';
import Navbar from '../../compenents/Navbar';

const UploadPost = ({setCurrUser}) => {

    const [text, settext] = useState("");
    const [img, setimg] = useState(null);
    const [error, seterror] = useState("");

    useEffect(() => {    //displaying the messsages when the error state changes
        if(error){
            document.getElementById("errpara").style.display="block";
            document.getElementById("errpara").innerHTML=error;
            document.getElementById("successpara").style.display="none";
            document.getElementById("uploadingpara").style.display="none";

            setTimeout(() => {
                document.getElementById("errpara").style.display="none";
                seterror("");

            }, 3000);
        }
        else{
            document.getElementById("errpara").style.display="none";
            document.getElementById("errpara").innerHTML=error;
            document.getElementById("successpara").style.display="none";
            document.getElementById("uploadingpara").style.display="none";
        }
      }, [error])


    const handleUpload = async (e) => {

        document.getElementById("uploadingpara").style.display="block";         //displaying the upload msg when the user clicks on upload btn
        e.preventDefault();

        const getUser = await getUserCall();
        const user = getUser.data.User;
        console.log("user from uploadpost:",user);

        if(!text && !img){         //If both text and mg are absent then return with the err
          seterror("Post can't be empty");
          return;
        }

        function showError(error) {       //showing errors if any occurs related to geolocation
            switch(error.code) {
              case error.PERMISSION_DENIED:
                seterror ("User denied the request for location.")
                break;
              case error.POSITION_UNAVAILABLE:
                seterror( "Location information is unavailable.")
                break;
              case error.TIMEOUT:
                seterror ("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
                seterror( "An unknown error occurred.")
                break;
            }
          }

    //geolocation api for getting the location from the user device
        if (navigator.geolocation) {    //If location can be acccessed
            let latitude = "";
            let longitude = "";
            let country = "";

            navigator.geolocation.getCurrentPosition(async (position) => {        //get the lcoation

                
                latitude = position.coords.latitude;   //latitude
                longitude = position.coords.longitude; //longitude

                if (latitude && longitude) {   //if both lat and lng are present then api call for getting the country name
                    const res = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apikey=vBwTghNx3m-k8uhDDbG9p5_KGZQv-mv4nvZ7it0OroA`);
                    country = await res.data.items[0].address.countryName;
            
                }
                
                const location = {latitude, longitude, country};
                
             if(img){            //If img is present then .. 
                const ImgName = new Date().getTime() + img.name;            
                const storage = getStorage(app);
                const storageRef = ref(storage, ImgName);  //using firebase storeage to store the img uploaded by the user.
                const uploadTask = uploadBytesResumable(storageRef, img);  

                uploadTask.on('state_changed',
                    (snapshot) => {

                    },
                    (error) => {
                        seterror("Problem in uploading the image");
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {  //getting the download url after successfull upload of the img
            

                            if (user && location && (text || downloadURL)) {
                                const data = {
                                    user: user,
                                    text: text, 
                                    img: downloadURL,        //downloadURL from the firebase will be passed in the ongodb post document
                                    location: location
                                }
                                const res = await uploadPost(data);
                                
                                if(res){    //successfull upload of the post
                                    document.getElementById("uploadingpara").style.display="none";
                                    document.getElementById("successpara").style.display="block";

                                    setTimeout(() => {
                                       document.getElementById("successpara").style.display="none";
                                    }, 5000);
                                }
                            }
                            else{
                                seterror("Some info missing")
                            }
                        })
                    }
                )

                }
                else{     //If no img is present then upload the post with only text
                    if (user && location && (text)) {
                        const data = {
                            user: user,
                            text: text,
                            img: "",
                            location: location
                        }
                        const res = await uploadPost(data);
                        
                        
                        if(res){    //handling the messages on successfull upload of the post
                            document.getElementById("uploadingpara").style.display="none";
                            document.getElementById("successpara").style.display="block";

                            setTimeout(() => {
                               document.getElementById("successpara").style.display="none";
                            }, 5000);
                        }
            
                    }
                    else{
                        seterror("Some info missing");
                    }
                }
            }, showError)
            }
            else {
                alert("geolocation is not supported");
            }
    }

return (
    <>
    <Navbar setCurrUser={setCurrUser}/>
        <div className="container">
            <div className="myCard" >
                <div className="row">
                    <div className="col-md-11">
                        <div className="myLeftCtn">
                            <form onSubmit={handleUpload} className="myForm text-center">
                                <header>Upload a Post</header>

                                <div className="form-group">
                                    <i className="fas fa-solid fa-align-left"></i>
                                    <input className="myInput mb-4" placeholder="text" type="text" id="email" onChange={(e) => { settext(e.target.value) }} />
                                </div>

                                <div className="form-group">
                                    <i className="fas fa-solid fa-image"></i>
                                    <input type="file" className="myInput mb-5" id="image" placeholder="Image" onChange={(e) => { setimg(e.target.files[0]) }}/>
                                </div>

                                <button type="submit" className="butt mb-2" >Upload</button>

                                <p id="errpara" className='text-danger mt-3 fw-bold'></p>
                                <p id="uploadingpara" className='text-primary mt-3 fw-bold'>Uploading...</p>
                                <p id="successpara" className='text-success mt-3 fw-bold'>Success!!</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default UploadPost