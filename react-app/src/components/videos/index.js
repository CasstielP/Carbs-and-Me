import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as videoActions from '../../store/video'
import { useHistory, Link } from 'react-router-dom';
import VideoCard from './videoCard';
import './Video.css'
const VideoList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const videos = useSelector(state=>Object.values(state.video.allVideos))
    const singleVid = useSelector(state=>(state.video.singleVideo))

    useEffect(()=> {
        dispatch(videoActions.fetchAllVideos())
    }, [])



    return (
        <>
        {/* <h1>Video List</h1> */}
        <div className='video-container'>
            { videos.map((video)=>
                <VideoCard key={video.id} video={video} />
            )
            }
        </div>

        </>
    )
}


export default VideoList
