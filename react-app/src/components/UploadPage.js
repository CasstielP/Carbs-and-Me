import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import siteicon from './navigation/iconname.png'
import SideBar from "./sideBar";
const UploadVideo = ({ showSideBar, setShowSideBar }) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [error, setError] = useState([]);
  let errors = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    const formData = new FormData();
    formData.append("video", video);
    // formData.append('title', title)
    // formData.append("description", description);
    formData.append('thumbnail', thumbnail)
    if (!title) errors.push("Title cannot be empty");
    if (!description) errors.push("Description cannot be empty");
    if (!video) errors.push("Must upload a video file");
    if (video) {
      if (!video.type.endsWith("mp4" || "mov" || "wmv" || "flv" || "avi"))
        errors.push("Only video file type allowed");

    }
    if (!thumbnail) {
      error.push("Must uplaod a thumbnail image")
    } else if (thumbnail && !["image/jpeg", "image/png"].includes(thumbnail.type)) {
      errors.push("Only image file types (jpeg, png) are allowed for thumbnail image")
    }
    setError(errors);

    if (errors.length) {
      return;
    } else {
      console.log('urlurlurlurlurlurlurl', formData)
      setVideoLoading(true); // display video uploading info for the user
      const res = await fetch("/api/videos", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        let newVid = await res.json();
        const payload = {
          url:  newVid.video_url,
          user_id: user.id,
          title: title,
          thumbnail: newVid.thumbnail_url,
          description: description,

        };



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
  const updateImage = (e) => {
    const thumbImg = e.target.files[0];
    setThumbnail(thumbImg);
  };

  return (
    <>

      {user ?
        <div id='upload-sb-wrapper'>
          <SideBar showSideBar={showSideBar} />
          <div className="login-page-wrapper">
            <div className="login-wrapper">
              <div className="form-wrapper">
                <img id="ulp-icon" src={siteicon}></img>
                <h3 id="ul-h3">Become an inspiration, Start your Channel today!</h3>
                <form id="li-form-uploadPG" onSubmit={handleSubmit}>
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
                  {/* <label htmlFor="file-input">thumbnail</label> */}

                  <div className="input-file-container">
                    <div className='file_upload_title'>Thumbnail</div>
                    <input id="file-input" type="file" accept="image/*" onChange={updateImage} />
                  </div>
                  <div className="input-file-container">
                    {/* <label htmlFor="file-input">video</label> */}
                    <div className='file_upload_title'>Video</div>
                    <input id="file-input" type="file" accept="video/*" onChange={updateVideo} />
                  </div>
                  <button className="lg-button" type="submit">Submit</button>
                  {videoLoading && <p>Loading...</p>}
                </form>
              </div>
            </div>
          </div>

        </div>
        : history.push('/')
      }
    </>
    //testing
  );
};

export default UploadVideo;
