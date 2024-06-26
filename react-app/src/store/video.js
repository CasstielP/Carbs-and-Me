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
    const res = await fetch('/api/videos/')
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
    const data = await res.json()
    // console.log(data)
    if (res.ok){
        dispatch(getSingleVideo(data))
        return res
    }
}


// export const uploadVideoThunk = (payload, userId) => async (dispatch) => {

// }

//process likes

export const updateLikes = (userId, videoId) => async (dispatch) => {
    const res = await fetch(`/api/videos/likes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, videoId})
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(getSingleVideo(data))
        return data
    }
}


//process dislikes
export const updateDisLikes = (userId, videoId) => async (dispatch) => {
    const res = await fetch(`/api/videos/dislikes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, videoId})
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(getSingleVideo(data))
        return data
    }
}

// process subscription
// export const toggleSubcription = (userId)=> async (dispatch) => {
//     const res = await fetch(`/api/users/subscribe/${userId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userId)
//     })
//     if (res.ok) {
//       const data = await res.json()
//     //   console.log('gotheregotheregotheregothere', data)
//       return data
//     }
//   }



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
    singleVideo:{},
    userVideos:{}
}

const videoReducer  = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_VIDEOS:
            newState = {...state, allVideos:{}, singleVideo: {}, userVideos:{}}
            newState.singleVideo = {...state.singleVideo}
            action.videos.forEach(video=>(newState.allVideos[video.id] = video))
            // console.log('777777777777777777', newState)
            return newState

        case GET_USER_VIDEOS:
            newState = {...state, allVideos:{}, singleVideo:{}, userVideos:{}}
            action.videos.forEach(video=>{newState.userVideos[video.id]= video})
            return newState


        case GET_SINGLE_VIDEO:
            newState = {...state, singleVideo: action.video, allVideos:{}}
            newState.allVideos = {...state.allVideos}
            // newState.singleVideo = action.video
            return newState


        case EDIT_VIDEO:
            newState = {...state, singleVideo:{...state.singleVideo}, userVideos:{...state.userVideos}}
            newState.singleVideo = action.video
            console.log(action.video)
            newState.userVideos[action.video.id] = action.video
            return newState

        case DELETED_VIDEO:
            newState = {
                allVideos:{...state.allVideos},
                userVideos:{...state.userVideos},
                singleVideo:{}
            }
            delete newState.allVideos[action.videoId]
            delete newState.userVideos[action.videoId]
            return newState

        default:
            return state
        }
}


export default videoReducer
