import React, { useState } from "react";
import "./auth.css";
import Input from "../ui/Input";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import toast from "react-hot-toast";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();
  const nameChnage = (event) => {
    setName(event.target.value);
  };

  const emailChage = (event) => {
    setEmail(event.target.value);
  };

  const passwordChnage = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(apis().registerUser, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        toast.success(result?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }

    // console.log(name, email, password);
  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <p className="auth_heading">Welcome</p>
            <p className="auth_title">Create a new account</p>
          </div>
          <div className="auth_item">
            <label>Name *</label>
            <Input
              onChange={nameChnage}
              type="text"
              required
              placeholder="enter your name"
            />
          </div>
          <div className="auth_item">
            <label>Email *</label>
            <Input
              onChange={emailChage}
              type="email"
              required
              placeholder="enter your name"
            />
          </div>
          <div className="auth_item">
            <label>Password *</label>
            <Input
              onChange={passwordChnage}
              type="password"
              required
              placeholder="enter your name"
            />
          </div>

          <div className="auth_action">
            <Button>Register</Button>
          </div>
          <div>
            <BackToLogin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;