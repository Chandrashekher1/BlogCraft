import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    setIsSignIn(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      // For registration
      try {
        const response = await fetch("https://cp-blog.onrender.com/api/user", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const token = response.headers.get('authorization'); 
        if (token) {
          localStorage.setItem('authorization', token); 
          console.log("Registration Successful! Token:", token);
          navigate("/create-post");
        } else {
          throw new Error("No token received from server");
        }

      } catch (error) {
        console.error("Registration Error:", error.message);
      }
    } else {
      // For login
      try {
        const response = await fetch("https://cp-blog.onrender.com/api/login", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const token = response.headers.get('authorization'); 

        if (token) {
          localStorage.setItem('authorization', token); 
          console.log(token);
          
          navigate("/create-post");
        } else {
          throw new Error("No token received from server");
        }
      } catch (error) {
        console.error("Login Error:", error.message);
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col justify-center items-center border border-cyan-700 shadow-2xl shadow-blue-900 my-16 md:mx-[35%] mx-12 text-gray-300">
        <h1 className="font-bold text-4xl mt-8">{isSignIn ? "Sign Up" : "Login"}</h1>
        <form className="flex flex-col my-8" onSubmit={handleSubmit}>
          {isSignIn && (
            <>
              <label htmlFor="name" className="font-semibold text-xl my-2">Name :</label>
              <input
                type="text"
                id="name"
                required
                placeholder="Enter your Name.."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-4 w-full py-2 border-cyan-600 outline-none rounded-md"
              />
            </>
          )}
          <label className="font-semibold text-xl my-2">Email :</label>
          <input
            type="email"
            required
            placeholder="Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 border-cyan-600 outline-none rounded-md"
          />
          <label className="font-semibold text-xl my-2">Password :</label>
          <input
            type="password"
            required
            placeholder="password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 border-cyan-600 outline-none rounded-md"
          />
          <button
            type="submit"
            className="border px-16 py-2 mt-12 font-semibold text-xl active:bg-cyan-500 cursor-pointer border-cyan-600 rounded-md bg-cyan-700 outline-none"
          >
            Proceed
          </button>
          <p className="flex mt-8">
            Have not registered?{" "}
            <span className="mx-2 cursor-pointer underline" onClick={handleSignUp}>
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;