import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const UploadVideo = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [videoLoading, setVideoLoading] = useState(false);
    const user = useSelector(state=>state.session.user)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("video", video);
        formData.append('user_id', user.id)
        formData.append('title', title)
        formData.append('description', description)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setVideoLoading(true);

        const res = await fetch('/api/videos', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setVideoLoading(false);
            history.push("/");
        }
        else {
            setVideoLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="video/*"
              onChange={updateVideo}
            />
            <button type="submit">Submit</button>
            {(videoLoading) && <p>Loading...</p>}
        </form>
    )
}

export default UploadVideo;
