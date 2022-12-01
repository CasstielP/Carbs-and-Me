import { Link } from "react-router-dom";
import React, { useState } from 'react';
import EditVideoModal from '../editVideo/EditVideoModal'
import DeleteVideoModal from "../deleteVideo/deleteVideoModal";
const UserVideoCard = ({ video }) => {
  let end = new Date();
  let start = new Date(video.created_at);
  let elapsed = (end - start) / 1000 / 60 / 60 / 24;
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
          <div className="time-elapsed">{elapsed.toFixed()} days ago</div>
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
