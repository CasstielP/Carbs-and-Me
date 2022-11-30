import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UploadVideo = () => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [error, setError] = useState([]);
  let errors = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    const formData = new FormData();
    formData.append("video", video);
    if (!title) errors.push("Title cannot be empty");
    if (!description) errors.push("Description cannot be empty");
    if(!video) errors.push('Must upload a video file')
    if(video) {
      if(!video.type.includes('mp4'||'mov'||'wmv'||'flv'||'avi')) errors.push('Only video file type allowed')
    }
    setError(errors);
    if (error) {
      return
    }
    setVideoLoading(true);
    const res = await fetch("/api/videos", {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      let url = await res.text();
      const payload = {
        url: url,
        user_id: user.id,
        title: title,
        description: description,
      };
      const response = fetch("/api/videos/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setVideoLoading(false);
      // await response.json();
      window.alert("Successully Uploded Video");
      history.push("/");
    });
  };

  const updateVideo = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {error.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
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
      <input type="file" accept="video/*" onChange={updateVideo} />
      <button type="submit">Submit</button>
      {videoLoading && <p>Loading...</p>}
    </form>
  );
};

export default UploadVideo;
