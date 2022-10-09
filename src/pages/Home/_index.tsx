import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isAuthentication = useSelector(
    (state: any) => state.users.isAuthentication
  );
  const navigate = useNavigate();
  const handleStart = () => {
    if (isAuthentication) {
      navigate("/users");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="homepage-container relative">
        <video loop autoPlay muted className="absolute top-0">
          <source
            src="https://www.typeform.com/static/home-page/hero/video-1920.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="homepage-content">
        <div className="title-1">There's a better way to ask</div>
        <div className="title-2">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead-and make everyone happy.
        </div>
        <div className="title-3">
          <button className="btn-started" onClick={handleStart}>
            {!isAuthentication ? "Get started-it's free" : "Start doing quiz"}
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
