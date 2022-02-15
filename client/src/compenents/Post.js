import React from 'react'

const Post = ({post}) => {
  const date = post.createdAt.slice(0,10)      //extracting date from createdAt.
  return (
    <div className="card" style={{"width": "18rem"}}>
  <img src={post.img} className="card-img-top" style={{"width": "17.9rem", "height":"10rem", "objectFit":"cover"}} alt="Image..."/>
  <div className="card-body">
    <p>{post.user.username}</p>
    <p style={{"marginTop": "-15px"}}>{date}</p>
    <p style={{"marginTop": "-15px"}}>{post.location.country}</p>
    <p className="card-text">{post.text}</p>
  </div>
</div>
  )
}

export default Post