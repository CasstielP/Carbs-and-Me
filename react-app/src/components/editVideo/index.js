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
    if(!title)Errors.push('title cannot be empty')
    if(!description)Errors.push('description cannot be empty')
    setErrors(Errors)
    if(Errors.length) return;
    console.log('got here')
    const video = {
      title: title,
      description: description
    }
    dispatch(videoActions.editVideoThunk(video, videoId))
    .then(()=> {
      dispatch(videoActions.fetchUserVideos(user.id))
      setShowModal(false)
      alert('Successfully edited video')
    })
  }


  return (
    <>
      <div className="edit-video-modal">
      <div className="edit-vid-wrapper">

        <form className="edit-form" onSubmit={handleSubmit}>
      <div id="edit-modal-header">Edit Video</div>
        <div className="error-list">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="edit-modal-iw">
          <label className="edit-modal-label">
            Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id='em-short-in'
              className='em-input-field'

            >
            </input>

      </div>
      <div className="edit-modal-iw">

          <label className="edit-modal-label">
            Description:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='em-input-field'

            >
              </input>

      </div>
        <button className="em-submit-button" type="submit">Submit</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default EditVideoPage;
