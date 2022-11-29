import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as videoActions from "../../store/video";
import './editVideo.css'
const EditVideoPage = ({videoId, setShowModal}) => {
  const dispatch = useDispatch();
  const currentVideo = useSelector((state) => state.video.singleVideo);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState(currentVideo.title);
  const [description, setDescription] = useState(currentVideo.description);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // dispatch(videoActions.fetchAllVideos())
    dispatch(videoActions.fetchSingleVideo(videoId));
    setTitle(currentVideo.title);
    setDescription(currentVideo.description);
  }, [dispatch, videoId, currentVideo.title, currentVideo.description]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setErrors([]);
    setShowModal(false)
    const video = {
        title: title,
        description: description
    }
    dispatch(videoActions.editVideoThunk(video, videoId))
    window.alert('Successfully edited video')
  }


  return (
    <>
      <div className="edit-video-modal">
      <div>Edit Video</div>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default EditVideoPage;
