import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import apis from "../../utils/apis";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const emailChnage = (event) => {
    setEmail(event.target.value);
  };

  const passwordChnage = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      
      const response = await fetch(apis().loginUser, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
    
      if (!response.ok) {
        throw new Error(result?.message);
      }
      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem("accessToken", result?.token);
        console.log(result)
      }
    } catch (error) {
      toast.error(error.message);
    }

    console.log(email, password);
  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <p className="auth_heading">welcome back</p>
            <p className="auth_title">login to continue</p>
          </div>
          <div className="auth_item">
            <label>Email *</label>
            <Input
              onChange={emailChnage}
              type="email"
              required
              placeholder="enter your email"
            />
          </div>
          <div className="auth_item">
            <label>Password *</label>
            <Input
              onChange={passwordChnage}
              type="password"
              required
              placeholder="enter your password"
            />
          </div>
          <div className="auth_action">
            <Button> Login </Button>
          </div>
          <div className="auth_options">
            <Link to="/register">Create new account?</Link>
            <Link to="/forget/password">Forget password</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;