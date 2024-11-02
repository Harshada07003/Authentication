import React from "react";
import "./backtoLogin.css";
import {useNavigate} from 'react-router-dom'
const BackToLogin = () => {
    const navigate = useNavigate()
    const navigateHandler = ()=>{
        navigate('/login')
    }

  return (
    <div onClick={navigateHandler} className="back_toLogin_ui">
      <span>Back to login</span>
    </div>
  );
};

export default BackToLogin;