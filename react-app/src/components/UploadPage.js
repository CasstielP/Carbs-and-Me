import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import siteicon from './navigation/iconname.png'
import SideBar from "./sideBar";
const UploadVideo = ({showSideBar, setShowSideBar}) => {
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
    if (!video) errors.push("Must upload a video file");
    // console.log(video.type)
    if (video) {
      if (!video.type.endsWith("mp4" || "mov" || "wmv" || "flv" || "avi"))
        errors.push("Only video file type allowed");

    }
    setError(errors);

    if (errors.length) {
      return;
    } else {
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
        // const response =
        await fetch("/api/videos/new", {
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
    }
  };

  const updateVideo = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  return (
    <>
    <div id='upload-sb-wrapper'>
    <SideBar showSideBar={showSideBar}/>
    <div className="login-page-wrapper">
      <div className="login-wrapper">
        <div className="form-wrapper">
          <img id="ulp-icon" src={siteicon}></img>
          <h3 id="ul-h3">Become an inspiration, Start your Channel today!</h3>
          <form className="li-form" onSubmit={handleSubmit}>
            <div className="error-list">
              {error.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="lg-input-field"
              placeholder="title"
            />

            <input
              type="text"
              value={description}
              className="lg-input-field"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="input-file-container">
            <input id="file-input" type="file" accept="video/*" onChange={updateVideo} />

            </div>
            <button className="lg-button" type="submit">Submit</button>
            {videoLoading && <p>Loading...</p>}
          </form>
        </div>
      </div>
    </div>

    </div>

    </>
  //testing
  );
};

export default UploadVideo;
