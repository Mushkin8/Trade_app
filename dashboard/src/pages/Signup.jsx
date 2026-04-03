// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [cookies] = useCookies(["token"]);

//   const [inputValue, setInputValue] = useState({
//     email: "",
//     password: "",
//     username: "",
//   });

//   const { email, password, username } = inputValue;

//   // ✅ Redirect if already logged in
//   useEffect(() => {
//     if (cookies.token) {
//       navigate("/dashboard"); // better than "/"
//     }
//   }, [cookies, navigate]);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue({
//       ...inputValue,
//       [name]: value,
//     });
//   };

//   const handleError = (err) =>
//     toast.error(err, {
//       position: "bottom-left",
//     });

//   const handleSuccess = (msg) =>
//     toast.success(msg, {
//       position: "bottom-right",
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         "http://localhost:3002/signup",
//         { ...inputValue },
//         { withCredentials: true }
//       );

//       const { success, message } = data;

//       if (success) {
//         handleSuccess(message);

//         // ✅ redirect to login/dashboard
//         setTimeout(() => navigate("/login"), 1000);
//       } else {
//         handleError(message);
//       }
//     } catch (error) {
//       console.log(error);
//       handleError("Signup failed");
//     }

//     setInputValue({
//       email: "",
//       password: "",
//       username: "",
//     });
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Signup Account</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             placeholder="Enter email"
//             onChange={handleOnChange}
//             required
//           />

//           <input
//             type="text"
//             name="username"
//             value={username}
//             placeholder="Enter username"
//             onChange={handleOnChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             value={password}
//             placeholder="Enter password"
//             onChange={handleOnChange}
//             required
//           />

//           <button type="submit">Signup</button>

//           <span>
//             Already have an account?{" "}
//             <Link to="/login">Login</Link>
//           </span>
//         </form>

//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (cookies.token) {
      navigate("/dashboard");
    }
  }, [cookies, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3002/signup",
        {
          email: email.trim().toLowerCase(),   // 🔥 FIX
          username: username.trim(),           // 🔥 FIX
          password: password.trim(),           // 🔥 FIX
        },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);

        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Signup failed");
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleOnChange}
            required
          />

          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={handleOnChange}
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={handleOnChange}
            required
          />

          <button type="submit">Signup</button>

          <span>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;