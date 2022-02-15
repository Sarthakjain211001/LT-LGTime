import React, {useState, useEffect} from 'react'
import Navbar from '../compenents/Navbar';
import Posts from '../compenents/Posts';

const Home = ({currUser, setCurrUser}) => {

  const [userLocation, setuserLocation] = useState(null)

  useEffect(() => {             //getting the user location when the page loads
    if (navigator.geolocation) {
      let latitude = "";
      let longitude = "";

      navigator.geolocation.getCurrentPosition((position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          setuserLocation({latitude, longitude});
      })
    }
  },[])
  

  return (
      <div>
    <Navbar currUser={currUser} setCurrUser={setCurrUser}/>
     {userLocation && <Posts userLocation={userLocation}/>}         {/*if user Location is present then only show the posts*/}
     {!userLocation && <p className='fw-bold'>Please enable location</p>}    
    </div>
  )
}

export default Home