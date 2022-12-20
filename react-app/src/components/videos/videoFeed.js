import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as videoActions from "../../store/video";
import FeedVideoCard from "./feed-videoCard";

const VideoFeed = ({feedVids}) => {
    // const feedVids = useSelector(state=> state.video.allVideos)
    const dispatch = useDispatch()


    // useEffect(()=> {
    //     dispatch(videoActions.fetchAllVideos())
    // }, [])

    return (
        <>
        <div className="feed-container">
        {feedVids.map((video)=> (
            <FeedVideoCard  key={video.id} video={video}/>
        ))}
        </div>
        </>

    )
}


export default VideoFeed
