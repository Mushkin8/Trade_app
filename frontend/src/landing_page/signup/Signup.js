import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = inputValue;

  const handleOnChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3002/signup",
        {
          username,
          email,
          password,
        }
      );

      if (data.success) {
        alert("Signup successful");
        window.location.href = "http://localhost:3001/login";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Signup Account</h2>

        <input
          type="text"
          name="username"
          value={username}
          placeholder="Enter name"
          onChange={handleOnChange}
        />

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={handleOnChange}
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={handleOnChange}
        />

        <button type="submit">Signup</button>

        <p>
          Already have an account?{" "}
          <a href="http://localhost:3001/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;