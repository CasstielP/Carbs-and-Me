import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as videoActions from "../../store/video";
import { useHistory, Link, useParams } from "react-router-dom";
import VideoCard from "./videoCard";

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const video = useSelector((state) => state.video.singleVideo);
  const [singleVid, setSingleVid] = useState('')
  useEffect(() => {
    dispatch(videoActions.fetchSingleVideo(videoId))
    .then((res)=>{
      setSingleVid(res)
    })
  }, []);

  return (
    <>
      <h1>video detail page</h1>
      <div>
      <video controls width="1000">
        <source src={singleVid.url}></source>
      </video>
      <div>{singleVid.title}</div>
      </div>

    </>
  );
};

export default VideoDetailPage;
