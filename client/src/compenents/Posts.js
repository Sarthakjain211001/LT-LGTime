import React, { useState, useEffect } from 'react'
import { fetchAllPosts } from '../ApiCalls'
import Post from './Post'
import axios from 'axios'

const Posts = ({userLocation}) => {

  const distance = (lat1, lat2, lon1, lon2) =>{      //function for calculating distance between 2 points on earch using their location coordinates.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return (c * r);
  }

  const compare =(a,b)=>{                     //compare function to sort the array. This function sorts using their distance from the current user location

    const da = distance(userLocation.latitude, a.location.latitude, userLocation.longitude , a.location.longitude);
    const db = distance(userLocation.latitude,  b.location.latitude, userLocation.longitude, b.location.longitude);
    return da-db;
  }

  const [posts, setposts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetchAllPosts();   //api call to fetch all the notes.
        setposts(res.data.sort(compare));    //updating the notes state with the sorted notes.
      } catch (err) {
        console.log(err);
      }
    }

    getPosts();       //calling the getPosts function
  })



  return (
    <>
    <h3 style={{"textAlign":"center", "color":"#ae3ff2", "marginTop":"6px"}}>All the posts are sorted based on the closeness from your location</h3>
    <div className='mx-auto mt-5' style={{ "width": "90%" }}>
      <div className="d-flex justify-content-between flex-wrap">

        {
          posts && posts.map((post) => {
            return <div className="mt-3 mb-3" key={post._id}><Post post={post} /></div>
          })
        }
      </div>
    </div>
    </>
  )
}

export default Posts