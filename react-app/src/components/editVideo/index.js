import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as videoActions from "../../store/video";
import './editVideo.css'
const EditVideoPage = ({videoId, setShowModal}) => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.session.user)
  const currentVideo = useSelector((state) => state.video.singleVideo);
  let currentTitle = currentVideo.title
  let currentDescription = currentVideo.description
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  let Errors = []
  useEffect(() => {
    // dispatch(videoActions.fetchAllVideos())
    // dispatch(videoActions.fetchSingleVideo(videoId));
    setTitle(currentTitle);
    setDescription(currentDescription);
  }, [dispatch, videoId, currentTitle, currentDescription]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setErrors([]);
    // if(!title)Errors.push('title cannot be empty')
    // if(!description)Errors.push('description cannot be empty')
    // setErrors(Errors)
    // if(errors) return;
    const video = {
      title: title,
      description: description
    }
    dispatch(videoActions.editVideoThunk(video, videoId))
    dispatch(videoActions.fetchUserVideos(user.id))
    setShowModal(false)
    window.alert('Successfully edited video')
  }


  return (
    <>
      <div className="edit-video-modal">
      <div>Edit Video</div>
        <form className="edit-form" onSubmit={handleSubmit}>
        <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
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
