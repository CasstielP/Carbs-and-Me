//CONSTANTS
const GET_ALL_VIDEOS = 'videos/all'
const GET_USER_VIDEOS = 'videos/user'
const GET_SINGLE_VIDEO = 'videos/single'
const UPLOAD_VIDEO = 'videos/upload'
const EDIT_VIDEO = 'videos/edit'
const DELETED_VIDEO = 'videos/delete'


//ACTIONS

const getVideos = (videos) => {
    return {
        type: GET_ALL_VIDEOS,
        videos
    }
}


const getUserVideos = (videos) => {
    return {
        type: GET_USER_VIDEOS,
        videos
    }
}


const getSingleVideo = (video) => {
    return {
        type: GET_SINGLE_VIDEO,
        video
    }
}


const uploadVideo = (video) => {
    return {
        type: UPLOAD_VIDEO,
        video
    }
}


const editVideo = (video) => {
    return {
        type: EDIT_VIDEO,
        video
    }
}


const deleteVideo = (videoId) => {
    return {
        type: DELETED_VIDEO,
        videoId
    }
}




// thunks
export const fetchAllVideos = () => async (dispatch) => {
    const res = await fetch('/api/videos')
    const data = await res.json()
    if(res.ok) {
        dispatch(getVideos(data))
    }
}


export const fetchUserVideos = (userId) => async(dispatch) => {
    const res = await fetch(`/api/videos/users/${userId}`)
    const data = await res.json()
    if (res.ok) {
        dispatch(getUserVideos(data))
    }
}


export const fetchSingleVideo = (videoId) => async (dispatch) => {
    const res = await fetch(`/api/videos/${videoId}`)
    const data = res.json()
    if (res.ok){
        dispatch(getSingleVideo(data))
    }
}


// export const uploadVideoThunk = (payload, userId) => async (dispatch) => {

// }



export const editVideoThunk = (video, videoId) => async (dispatch) => {
    const res = await fetch(`/api/videos/${videoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(video)
    })
    if(res.ok) {
        const video = await res.json()
        dispatch(editVideo(video))
        return video
    }
}



export const deleteVideoThunk = (videoId) => async (dispatch) => {
    const res = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE'
    })
    if(res.ok) {
        dispatch(deleteVideo(videoId))
    }
}




//reducers

const initialState = {
    allVideos:{},
    singleVideo:{}
}

const videoReducer  = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_VIDEOS:
            newState = {...state, allVideos:{...action.videos}, singleVideo: {}}
            return newState

        case GET_SINGLE_VIDEO:
            newState = {...state, singleVideo:{...action.singleVideo}}

        case EDIT_VIDEO:
            newState = {...state}
            newState.allVideos[action.video.id] = action.video
            return newState

        case DELETED_VIDEO:
            newState = {
                allVideos:{...state.allVideos},
                singleVideo:{}
            }
            delete newState.allVideos[action.videoId]
            return newState

        default:
            return state
        }
}