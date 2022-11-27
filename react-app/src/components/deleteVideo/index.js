import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as videoActions from "../../store/video";


const DeleteVideoPage = ({ videoId, setShowModal }) => {
  const dispatch = useDispatch();
  // const currentVideo = useSelector((state) => state.video.singleVideo);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   dispatch(videoActions.fetchSingleVideo(videoId));
  // }, [dispatch, videoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setShowModal(false)
    dispatch(videoActions.deleteVideoThunk(videoId))
    window.alert('successfully deleted video')
  }


  return (
    <>
      <div>
        <h3>Are You Sure You Want to Delete this Video?</h3>
        <form onSubmit={handleSubmit}>
          <button className="submit-button" type="button" onClick={()=>setShowModal(false)}>
            Cancel
          </button>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default DeleteVideoPage;
