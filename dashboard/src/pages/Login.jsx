// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();

//   const [inputValue, setInputValue] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = inputValue;

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const { data } = await axios.post(
//           "http://https://trade-app-sx75.onrender.com/verify",
//           {},
//           { withCredentials: true }
//         );

//         if (data.status) {
//           navigate("/dashboard");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     verifyUser();
//   }, [navigate]);

//   const handleOnChange = (e) => {
//     setInputValue({
//       ...inputValue,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         "http://https://trade-app-sx75.onrender.com/login",
//         inputValue,
//         { withCredentials: true }
//       );

//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Login Account</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             placeholder="Enter email"
//             onChange={handleOnChange}
//           />

//           <input
//             type="password"
//             name="password"
//             value={password}
//             placeholder="Enter password"
//             onChange={handleOnChange}
//           />

//           <button type="submit">Login</button>
//         </form>

//         <p>
//           Don't have an account? <Link to="/signup">Signup</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  // ✅ Check if already logged in
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "https://trade-app-sx75.onrender.com/verify",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    };

    verifyUser();
  }, [navigate]);

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
        "https://trade-app-sx75.onrender.com/login",
        {
          email: email.trim().toLowerCase(),   // 🔥 FIX
          password: password.trim(),           // 🔥 FIX
        },
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login Account</h2>

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
            type="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={handleOnChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;