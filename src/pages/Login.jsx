import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => setIsSignIn(!isSignIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const url = isSignIn
        ? "https://cp-blog.onrender.com/api/user"
        : "https://cp-blog.onrender.com/api/login";
      const method = "POST";
      const body = isSignIn ? { name, email, password } : { email, password };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Operation failed");
      }

      const token = response.headers.get("authorization");
      if (token) {
        localStorage.setItem("authorization", token);
        navigate("/profile");
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setMessage(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md shadow-lg shadow-blue-900 border border-cyan-700 rounded-2xl px-8 py-10 w-11/12 sm:w-96 lg:w-[28rem] text-gray-300">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          {isSignIn ? "Sign Up" : "Login"}
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {isSignIn && (
            <>
              <label className="font-semibold text-lg my-2">Name:</label>
              <input
                type="text"
                required
                placeholder="Enter your Name.."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-4 py-2 border-cyan-600 outline-none rounded-md focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </>
          )}
          <label className="font-semibold text-lg my-2">Email:</label>
          <input
            type="email"
            required
            placeholder="Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 border-cyan-600 outline-none rounded-md focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          <label className="font-semibold text-lg my-2">Password:</label>
          <input
            type="password"
            required
            placeholder="Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 border-cyan-600 outline-none rounded-md focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}

          <button
            type="submit"
            className="mt-6 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition-all shadow-md active:scale-95"
          >
            {isSignIn ? "Register" : "Proceed"}
          </button>

          <p className="mt-6 text-sm text-center">
            {isSignIn ? "Already have an account?" : "Haven't registered yet?"}{" "}
            <span
              className="text-cyan-400 cursor-pointer underline hover:text-cyan-300"
              onClick={handleSignUp}
            >
              {isSignIn ? "Login" : "Register"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
