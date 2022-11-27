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
        console.log('adfasfdasdfasdfasdfasdf', formData)
        setVideoLoading(true);
        const res = await fetch('/api/videos', {
            method: "POST",
            body: formData
        })
        .then(async (res)=> {

        let url = await res.text()
          const payload = {
          url: url,
          user_id: user.id,
          title: title,
          description: description
        }
        const response = fetch('/api/videos/new', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body:JSON.stringify(payload)
        })
        if (response.ok) {
            await response.json();
            setVideoLoading(false);
            history.push("/");
        }
        })
    }

    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    }

    return (
        <form onSubmit={handleSubmit}>
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
