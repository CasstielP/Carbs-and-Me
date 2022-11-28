import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as commentActions from '../../store/comment'
import { useHistory, Link } from 'react-router-dom';
import CommentCard from './commentCard';


const CommentList = ({videoId}) => {
    const videoComments = useSelector(state=>Object.values(state.comment.videoComments))
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(commentActions.fetchAllComments(videoId))
    }, [dispatch, videoId])

    return (
        <>
        <div>Comment List</div>
        <div className='comment-container'>
        { videoComments.map((comment)=>
                <CommentCard key={comment.id} comment={comment} />
            )
            }
        </div>
        </>

    )
}

export default CommentList
