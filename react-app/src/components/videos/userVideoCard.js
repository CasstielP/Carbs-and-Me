import { Link } from "react-router-dom";
import React, { useState } from 'react';
import EditVideoModal from '../editVideo/EditVideoModal'
import DeleteVideoModal from "../deleteVideo/deleteVideoModal";
const UserVideoCard = ({ video }) => {
  let end = new Date();
  // let start = new Date(new Date(video.created_at).toLocaleString('en-US', { timeZone: "UTC" }));
  let start = new Date(video.created_at)


  let elapsed = ((end - start));

  if(elapsed < 60000) {
    elapsed = `few seconds ago`
}
  if(elapsed >= 60000   && elapsed < 3600000) {
    elapsed = ((end - start))/1000/60
    elapsed = elapsed<2 ? `1 minute ago` : `${elapsed.toFixed()} minutes ago`
  }
  if (3600000 <= elapsed && elapsed <86400000) {
    elapsed = ((end - start))/1000/60/60
    elapsed = elapsed<2 ? `1 hour ago` : `${elapsed.toFixed()} hours ago`
  }
 if( elapsed >= 86400000) {
    elapsed = ((end - start)) / 1000/60/60/24
    elapsed = elapsed<2 ? `${elapsed.toFixed()} day ago` : `${elapsed.toFixed()} days ago`
}
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="video-card-container">
        <div>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/videos/${video.id}`}
          >
            <video className="video-box" controls width="350">
              <source src={video.url}></source>
            </video>
          </Link>
        </div>
        <div className="video-card-info">
          <div className="video-title">{video.title}</div>
          <div className="time-elapsed">{elapsed}</div>
          <div className="auth-button">
           <EditVideoModal  videoId={video.id}/>
          {/* <button>Delete</button> */}
          <DeleteVideoModal  videoId={video.id}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserVideoCard;
